const { ethers, Contract } = require('ethers');

const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const univ3Config = require('./pancakeswap.v3.config');
const { GetContractCreationBlockNumber } = require('../utils/web3.utils');
const { fnName, sleep, roundTo, readLastLine, retry } = require('../utils/utils');
const { getConfTokenBySymbol, normalize } = require('../utils/token.utils');
const { RecordMonitoring } = require('../utils/monitoring');
const { DATA_DIR } = require('../utils/constants');
const path = require('path');
const { providers } = require('@0xsequence/multicall');
const { getPriceFromSqrt, getAllPoolsToFetch } = require('./pancakeswap.v3.utils');
const { pairsToFetch } = require('../global.config');

// save liquidity data every 'CONSTANT_BLOCK_INTERVAL' blocks

const RPC_URL = process.env.PANCAKE_V3_PRICE_RPC_URL;
const STEP_MAX = Number(process.env.PANCAKE_V3_PRICE_STEP_MAX) || Number.MAX_SAFE_INTEGER;

const runEverySec = 60 * 60;

const WORKER_NAME = 'pancakeswapV3 Price Fetcher';

/**
 * Fetch all liquidity history from pancakeswapV3 pairs
 * The pairs to fetch are read from the config file './pancakeswap.v3.config'
 */
async function pancakeswapV3PriceHistoryFetcher(onlyOnce = false) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const start = Date.now();
    try {
      await RecordMonitoring({
        name: WORKER_NAME,
        status: 'running',
        lastStart: Math.round(start / 1000),
        runEvery: runEverySec
      });

      if (!RPC_URL) {
        throw new Error('Could not find RPC_URL env variable');
      }

      if (!fs.existsSync(path.join(DATA_DIR, 'precomputed', 'price', 'pancakeswapv3'))) {
        fs.mkdirSync(path.join(DATA_DIR, 'precomputed', 'price', 'pancakeswapv3'), { recursive: true });
      }

      console.log(`${fnName()}: starting`);
      const web3Provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL);
      const multicallProvider = new providers.MulticallProvider(web3Provider);
      const univ3Factory = new Contract(
        univ3Config.pancakeswapFactoryV3Address,
        univ3Config.pancakeswapFactoryV3Abi,
        multicallProvider
      );
      const currentBlock = (await web3Provider.getBlockNumber()) - 10;

      console.log(`${fnName()}: getting pools to fetch`);
      const poolsToFetch = await retry(async () => getAllPoolsToFetch(univ3Factory, web3Provider), [], 0, 10);
      console.log(
        `${fnName()}: found ${poolsToFetch.length} pools to fetch from ${pairsToFetch.length} pairs in config`
      );

      const poolsToFetchGroupedByPair = {};
      for (const fetchConfig of poolsToFetch) {
        const pairKey = `${fetchConfig.pairToFetch.token0}-${fetchConfig.pairToFetch.token1}`;
        if (!poolsToFetchGroupedByPair[pairKey]) {
          poolsToFetchGroupedByPair[pairKey] = {
            pairToFetch: fetchConfig.pairToFetch,
            pools: []
          };
        }
        poolsToFetchGroupedByPair[pairKey].pools.push(fetchConfig.poolAddress);
      }

      const stalePairs = [];
      let promises = [];
      for (const groupedFetchConfig of Object.values(poolsToFetchGroupedByPair)) {
        if (ignorePool(groupedFetchConfig.pairToFetch.token0, groupedFetchConfig.pairToFetch.token1)) {
          console.log(
            `Ignoring pair ${groupedFetchConfig.pairToFetch.token0}-${groupedFetchConfig.pairToFetch.token1}`
          );
          continue;
        }
        const promise = FetchpancakeswapV3PriceHistoryForPair(
          groupedFetchConfig.pairToFetch,
          groupedFetchConfig.pools,
          web3Provider,
          currentBlock
        );
        // await promise;
        promises.push(promise);
        // const lastBlockWithData = await FetchpancakeswapV3PriceHistoryForPair(groupedFetchConfig.pairToFetch, groupedFetchConfig.pools, web3Provider, currentBlock);

        await sleep(500);
      }

      const results = await Promise.all(promises);
      for (const result of results) {
        if (currentBlock - result.lastBlockWithData > 500_000) {
          stalePairs.push(
            `no data since ${currentBlock - result.lastBlockWithData} blocks for ${result.token0}/${result.token1}`
          );
        }
      }

      for (const stalePair of stalePairs) {
        console.warn(stalePair);
      }

      const runEndDate = Math.round(Date.now() / 1000);
      await RecordMonitoring({
        name: WORKER_NAME,
        status: 'success',
        lastEnd: runEndDate,
        lastDuration: runEndDate - Math.round(start / 1000),
        lastBlockFetched: currentBlock
      });
    } catch (error) {
      const errorMsg = `An exception occurred: ${error}`;
      console.log(errorMsg);
      await RecordMonitoring({
        name: WORKER_NAME,
        status: 'error',
        error: errorMsg
      });
    }

    if (onlyOnce) {
      return;
    }

    const sleepTime = runEverySec * 1000 - (Date.now() - start);
    if (sleepTime > 0) {
      console.log(`${fnName()}: sleeping ${roundTo(sleepTime / 1000 / 60)} minutes`);
      await sleep(sleepTime);
    }
  }
}

function ignorePool(token0, token1) {
  switch (`${token0}-${token1}`) {
    default:
      return false;
    case 'wBETH-USDC':
    case 'wBETH-FDUSD':
    case 'USDC-wBETH':
    case 'TUSD-FDUSD':
    case 'FDUSD-wBETH':
    case 'FDUSD-TUSD':
    case 'wBETH-USDT':
    case 'USDT-wBETH':
    case 'BTCB-wBETH':
    case 'wBETH-BTCB':
    case 'WBNB-wBETH':
    case 'wBETH-WBNB':
    case 'TUSD-WBNB':
    case 'WBNB-TUSD':
      return true;
  }
}

async function FetchpancakeswapV3PriceHistoryForPair(pairToFetch, pools, web3Provider, currentBlock) {
  // the idea is to fetch events for every 100k blocks for every pools,
  // then sort the results by amount of swap in this 100k blocks interval
  // meaning we will store the prices of each pools but every time a trade occured in the same block
  // for a different pool, the pool with the most swaps will prevail

  const token0Conf = getConfTokenBySymbol(pairToFetch.token0);
  const token1Conf = getConfTokenBySymbol(pairToFetch.token1);

  const label = `FetchpancakeswapV3PriceHistoryForPair[${token0Conf.symbol}-${token1Conf.symbol}]`;

  // get the first block to fetch
  const priceHistoryFilename = path.join(
    DATA_DIR,
    'precomputed',
    'price',
    'pancakeswapv3',
    `${pairToFetch.token0}-${pairToFetch.token1}-unified-data.csv`
  );
  const priceHistoryReversedFilename = path.join(
    DATA_DIR,
    'precomputed',
    'price',
    'pancakeswapv3',
    `${pairToFetch.token1}-${pairToFetch.token0}-unified-data.csv`
  );

  let sinceBlock = 0;
  if (fs.existsSync(priceHistoryFilename) && fs.existsSync(priceHistoryReversedFilename)) {
    const lastLine = await readLastLine(priceHistoryFilename);
    sinceBlock = Number(lastLine.split(',')[0]) + 1;
    if (isNaN(sinceBlock)) {
      sinceBlock = 0;
    }

    // check same block for both files
    const lastLineReversed = await readLastLine(priceHistoryReversedFilename);
    let sinceBlockReversed = Number(lastLineReversed.split(',')[0]) + 1;
    if (isNaN(sinceBlockReversed)) {
      sinceBlockReversed = 0;
    }

    if (sinceBlockReversed != sinceBlock) {
      // inconsistency, throw
      throw new Error('Both price files not the same block ?');
    }
  } else {
    fs.writeFileSync(priceHistoryFilename, 'blocknumber,price\n');
    fs.writeFileSync(priceHistoryReversedFilename, 'blocknumber,price\n');
  }

  if (sinceBlock == 0) {
    // find the oldest pool
    for (const poolAddress of pools) {
      const startBlock = await GetContractCreationBlockNumber(web3Provider, poolAddress);
      sinceBlock = sinceBlock == 0 ? startBlock + 100_000 : Math.min(sinceBlock, startBlock + 100_000); // leave 100k blocks ~2 weeks after pool creation because many pools starts with weird data
    }
  }

  let lastBlockWithData = sinceBlock;

  // initializes the pools contracts
  const contracts = {};
  for (const poolAddress of pools) {
    contracts[poolAddress] = new Contract(poolAddress, univ3Config.pancakeswapV3PairAbi, web3Provider);
  }

  const step = 100_000;
  let fromBlock = sinceBlock;
  let toBlock = 0;

  while (toBlock < currentBlock) {
    toBlock = fromBlock + step - 1;
    if (toBlock > currentBlock) {
      toBlock = currentBlock;
    }

    const tradesByPool = {};
    console.log(`${label}: fetching events for blocks [${fromBlock}-${toBlock}]`);
    for (const poolAddress of pools) {
      const contract = contracts[poolAddress];
      const swaps = await fetchEvents(fromBlock, toBlock, contract, token0Conf, token1Conf);
      // const swapCount = swaps.length;
      // console.log(`${label}: found ${swapCount} swap event for pool ${poolAddress}`);
      tradesByPool[poolAddress] = swaps;
    }

    let mainPool = pools[0];
    let mainPoolTradeCount = 0;
    for (const poolAddress of pools) {
      const poolSwaps = tradesByPool[poolAddress];
      if (poolSwaps.length > mainPoolTradeCount) {
        mainPoolTradeCount = poolSwaps.length;
        mainPool = poolAddress;
      }
    }
    if (mainPoolTradeCount == 0) {
      console.log(`${label}: not a single swap, ignoring block interval`);
      fromBlock = toBlock + 1;
      continue;
    }

    let allSwaps = tradesByPool[mainPool];
    console.log(`${label}: [pool ${mainPool}]: ${mainPoolTradeCount} swaps`);

    for (const poolAddress of pools) {
      if (poolAddress == mainPool) {
        continue;
      }

      const poolSwaps = tradesByPool[poolAddress];
      if (poolSwaps.length < mainPoolTradeCount * 0.5) {
        console.log(`${label}: [pool ${poolAddress}]: ${poolSwaps.length} swaps | too few, swaps discarded`);
      } else {
        console.log(`${label}: [pool ${poolAddress}]: ${poolSwaps.length} swaps | enough, keeping swaps`);
        allSwaps = allSwaps.concat(poolSwaps);
      }
    }

    // sort by blocks
    allSwaps.sort((a, b) => a.block - b.block);

    const toWrite = [];
    const toWriteReversed = [];
    for (const priceData of allSwaps) {
      toWrite.push(`${priceData.block},${priceData.price}\n`);
      toWriteReversed.push(`${priceData.block},${1 / priceData.price}\n`);
      lastBlockWithData = priceData.block;
    }

    fs.appendFileSync(priceHistoryFilename, toWrite.join(''));
    fs.appendFileSync(priceHistoryReversedFilename, toWriteReversed.join(''));

    fromBlock = toBlock + 1;
  }

  console.log(`${label}: ENDED`);
  return { lastBlockWithData, token0: token0Conf.symbol, token1: token1Conf.symbol };
}

async function fetchEvents(startBlock, endBlock, contract, token0Conf, token1Conf) {
  const initBlockStep = 10000;
  let blockStep = initBlockStep;
  let fromBlock = startBlock;
  let toBlock = 0;
  let cptError = 0;
  const swapResults = [];
  while (toBlock < endBlock) {
    toBlock = fromBlock + blockStep - 1;
    if (toBlock > endBlock) {
      toBlock = endBlock;
    }

    let events = undefined;
    try {
      events = await contract.queryFilter('Swap', fromBlock, toBlock);
    } catch (e) {
      // console.log(`query filter error: ${e.toString()}`);
      blockStep = Math.round(blockStep / 2);
      if (blockStep < 1000) {
        blockStep = 1000;
      }
      toBlock = 0;
      cptError++;
      continue;
    }

    // console.log(`${fnName()}[${fromBlock} - ${toBlock}]: found ${events.length} Swap events after ${cptError} errors (fetched ${toBlock-fromBlock+1} blocks)`);

    if (events.length != 0) {
      const swapData = {};
      for (const e of events) {
        const price = getPriceFromSqrt(e.args.sqrtPriceX96, token0Conf.decimals, token1Conf.decimals);

        const token0Amount = Math.abs(normalize(e.args.amount0, token0Conf.decimals));
        if (token0Amount < token0Conf.dustAmount) {
          continue;
        }
        const token1Amount = Math.abs(normalize(e.args.amount1, token1Conf.decimals));
        if (token1Amount < token1Conf.dustAmount) {
          continue;
        }

        swapData[e.blockNumber] = price;
      }

      for (const [block, price] of Object.entries(swapData)) {
        swapResults.push({
          block: block,
          price: price //token1Amount/token0Amount
        });
      }

      // try to find the blockstep to reach 9000 events per call as the RPC limit is 10 000,
      // this try to change the blockstep by increasing it when the pool is not very used
      // or decreasing it when the pool is very used
      const newBlockStep = Math.min(1_000_000, Math.round((blockStep * 8000) / events.length));

      if (newBlockStep > blockStep * 2) {
        blockStep = blockStep * 2;
      } else {
        blockStep = newBlockStep;
      }

      cptError = 0;
    } else {
      // if 0 events, multiply blockstep by 4
      blockStep = blockStep * 2;
    }
    fromBlock = toBlock + 1;

    blockStep = Math.min(STEP_MAX, blockStep);
  }

  return swapResults;
}

// pancakeswapV3PriceHistoryFetcher();
module.exports = { pancakeswapV3PriceHistoryFetcher };
