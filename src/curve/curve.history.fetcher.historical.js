const { ethers, Contract } = require('ethers');
const dotenv = require('dotenv');
const { getBlocknumberForTimestamp } = require('../utils/web3.utils');
const curveConfig = require('./curve.config');
const fs = require('fs');
const path = require('path');
const { sleep, fnName, readLastLine, roundTo } = require('../utils/utils');

const { RecordMonitoring } = require('../utils/monitoring');
// const { generateUnifiedFileCurve } = require('./curve.unified.generator');
const { DATA_DIR } = require('../utils/constants');
const { providers } = require('@0xsequence/multicall');
const { getConfTokenBySymbol, normalize } = require('../utils/token.utils');

dotenv.config();
const RPC_URL = process.env.RPC_URL;

const runnerName = 'Curve Fetcher Historical';
/**
 * the main entrypoint of the script, will run the fetch against all pool in the config
 */
async function CurveHistoryFetcher() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const start = Date.now();
        try {
            await RecordMonitoring({
                'name': runnerName,
                'status': 'running',
                'lastStart': Math.round(start/1000),
                'runEvery': 10 * 60
            });

            if(!fs.existsSync(path.join(DATA_DIR, 'curve'))) {
                fs.mkdirSync(path.join(DATA_DIR, 'curve'));
            }

            const lastResults = {};
            const web3Provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL);
            const currentBlock = await web3Provider.getBlockNumber() - 10;
            for(const fetchConfig of curveConfig.curvePairsHistory) {
                const lastData = await FetchHistory(fetchConfig, currentBlock, web3Provider);
                lastResults[`${fetchConfig.poolName}_${fetchConfig.lpTokenName}`] = lastData;
            }

            const poolSummaryFullname = path.join(DATA_DIR, 'curve', 'curve_pools_summary.json');
            fs.writeFileSync(poolSummaryFullname, JSON.stringify(lastResults, null, 2));

            // await generateUnifiedFileCurve(currentBlock);

            const runEndDate = Math.round(Date.now()/1000);
            await RecordMonitoring({
                'name': runnerName,
                'status': 'success',
                'lastEnd': runEndDate,
                'lastDuration': runEndDate - Math.round(start/1000),
                'lastBlockFetched': currentBlock
            });
        } catch(error) {
            const errorMsg = `An exception occurred: ${error}`;
            console.log(errorMsg);
            await RecordMonitoring({
                'name': runnerName,
                'status': 'error',
                'error': errorMsg
            });
        }
        // sleep 10 min - time it took to run the loop
        // if the loop took more than 10 minutes, restart directly
        const sleepTime = 600 * 1000 - (Date.now() - start);
        if(sleepTime > 0) {
            console.log(`${fnName()}: sleeping ${roundTo(sleepTime/1000/60)} minutes`);
            await sleep(sleepTime);
        }
    }
}

/**
 * Takes a fetchConfig from curve.config.js and outputs liquidity file in /data
 * @param {{poolAddress: string, poolName: string, version: number, abi: string, ampFactor: number, additionnalTransferEvents: {[symbol: string]: string[]}}} fetchConfig 
 * @param {number} currentBlock 
 * @param {StaticJsonRpcProvider} web3Provider 
 */
async function FetchHistory(fetchConfig, currentBlock, web3Provider) {
    const historyFileName = path.join(DATA_DIR, 'curve', `${fetchConfig.poolName}_${fetchConfig.lpTokenName}_curve.csv`);
    // by default, fetch for the last 380 days (a bit more than 1 year)

    const startDate = Math.round(Date.now()/1000) - 380 * 24 * 60 * 60;

    let startBlock = 0; 

    if (fs.existsSync(historyFileName)) {
        const lastLine = await readLastLine(historyFileName);
        startBlock = Number(lastLine.split(',')[0]) + 1;
    } else {
        startBlock = await getBlocknumberForTimestamp(startDate);
    }

    // fetch all blocks where an event occured since startBlock
    const allBlocksWithEvents = await getAllBlocksWithEvents(fetchConfig, startBlock, currentBlock, web3Provider);

    console.log(`found ${allBlocksWithEvents.length} blocks with events since ${startBlock}`);
    
    await fetchReservesData(fetchConfig, historyFileName, startBlock, web3Provider, allBlocksWithEvents);

    // read the lalst line of the file to return lastData
    const lastLine = await readLastLine(historyFileName);
    const lastData = {};
    for(let i = 0; i < fetchConfig.tokens.length; i++) {
        const tokenSymbol = fetchConfig.tokens[i].symbol;
        const confToken = getConfTokenBySymbol(tokenSymbol);
        const tokenReserve = normalize(lastLine.split(',')[i+3], confToken.decimals);
        lastData[tokenSymbol] = tokenReserve;
    }

    return lastData;
}

async function fetchReservesData(fetchConfig, historyFileName, lastBlock, web3Provider, allBlocksWithEvents) {
    let lastBlockCurrent = lastBlock;
    const multicallProvider = new providers.MulticallProvider(web3Provider);
    const lpTokenContract = new Contract(fetchConfig.lpTokenAddress, curveConfig.erc20Abi, multicallProvider);
    const poolContract = new Contract(fetchConfig.poolAddress, curveConfig.stableSwapAbi, multicallProvider);

    if(!fs.existsSync(historyFileName)) {
        let tokensStr = [];
        for(const token of fetchConfig.tokens) {
            tokensStr.push(`reserve_${token.symbol}_${token.address}`);
        }

        fs.writeFileSync(historyFileName, `blocknumber,ampFactor,lp_supply_${fetchConfig.lpTokenAddress},${tokensStr.join(',')}\n`);
    }

    for(const blockNum of allBlocksWithEvents) {
        if(blockNum - 50 < lastBlockCurrent) {
            console.log(`ignoring block ${blockNum}`);
            continue;
        }

        console.log(`Working on block ${blockNum}`);

        const promises = [];
        promises.push(poolContract.A({blockTag: blockNum}));
        promises.push(lpTokenContract.totalSupply({blockTag: blockNum}));
        for(let i = 0; i < fetchConfig.tokens.length; i++) {
            promises.push(poolContract.balances(i, {blockTag: blockNum}));
        }

        const promiseResults = await Promise.all(promises);

        const tokenReserves = [];

        for(let i = 0; i < fetchConfig.tokens.length; i++) {
            tokenReserves.push(promiseResults[i+2].toString());
        }

        fs.appendFileSync(historyFileName, `${blockNum},${promiseResults[0]},${promiseResults[1].toString()},${tokenReserves.join(',')}\n`);
        lastBlockCurrent = blockNum;
    }
}

/**
 * 
 * @param {*} fetchConfig 
 * @param {number} fromBlock 
 * @param {number} toBlock 
 * @param {StaticJsonRpcProvider} web3Provider 
 * @returns {Promise<number[]>}
 */
async function getAllBlocksWithEvents(fetchConfig, fromBlock, toBlock, web3Provider) {
    let curveContract = undefined;
    let topics = [];
    switch(fetchConfig.abi.toLowerCase()) {
        case 'stableswap':
            curveContract = new Contract(fetchConfig.poolAddress, curveConfig.stableSwapAbi, web3Provider);
            topics = [
                curveContract.filters.TokenExchange().topics[0],
                curveContract.filters.TokenExchangeUnderlying().topics[0],
                curveContract.filters.AddLiquidity().topics[0],
                curveContract.filters.RemoveLiquidity().topics[0],
                curveContract.filters.RemoveLiquidityOne().topics[0],
                curveContract.filters.RemoveLiquidityImbalance().topics[0],
                curveContract.filters.RampA().topics[0],
                curveContract.filters.StopRampA().topics[0],
            ];
            break;
        case 'curvepool':
            curveContract = new Contract(fetchConfig.poolAddress, curveConfig.curvePoolAbi, web3Provider);
            topics = [
                curveContract.filters.TokenExchange().topics[0],
                curveContract.filters.AddLiquidity().topics[0],
                curveContract.filters.RemoveLiquidity().topics[0],
                curveContract.filters.RemoveLiquidityOne().topics[0],
                curveContract.filters.RemoveLiquidityImbalance().topics[0],
                curveContract.filters.RampA().topics[0],
                curveContract.filters.StopRampA().topics[0],
            ];
            break;
        case 'susdpool':
            curveContract = new Contract(fetchConfig.poolAddress, curveConfig.curvePoolAbi, web3Provider);
            topics = [
                curveContract.filters.TokenExchange().topics[0],
                curveContract.filters.AddLiquidity().topics[0],
                curveContract.filters.RemoveLiquidity().topics[0],
                curveContract.filters.RemoveLiquidityOne().topics[0],
                curveContract.filters.RemoveLiquidityImbalance().topics[0],
                curveContract.filters.NewParameters().topics[0],
                curveContract.filters.CommitNewParameters().topics[0],
            ];
            break;
        default: 
            throw new Error(`Unknown abi: ${fetchConfig.abi}`);
    }

    return await getAllBlocksWithEventsForContractAndTopics(fetchConfig, fromBlock, toBlock, curveContract, topics);
}

async function getAllBlocksWithEventsForContractAndTopics(fetchConfig, startBlock, endBlock, curveContract, topics) {
    const blockSet = new Set();

    let fromBlock = startBlock;
    let blockStep = 100000;
    while(fromBlock <= endBlock) {
        let toBlock = Math.min(endBlock, fromBlock + blockStep - 1);
        
        try {
            const events = await curveContract.queryFilter({
                topics: [topics]
            }, fromBlock, toBlock);

            console.log(`${fnName()}[${fetchConfig.poolName}-${fetchConfig.lpTokenName}]: [${fromBlock} - ${toBlock}] found ${events.length} events (fetched ${toBlock-fromBlock+1} blocks)`);

            if(events.length != 0) {
                for(const e of events) {
                    blockSet.add(e.blockNumber);
                }
                
                const newBlockStep = Math.min(1_000_000, Math.round(blockStep * 8000 / events.length));
                if(newBlockStep > blockStep * 2) {
                    blockStep = blockStep * 2; 
                } else {
                    blockStep = newBlockStep;
                }
            } else {
                // if 0 events, multiply blockstep by 2
                blockStep = blockStep * 2;
            }

            fromBlock = toBlock +1;
        }
        catch(e) {
            // console.log('query filter error:', e);
            blockStep = Math.round(blockStep / 2);
            if(blockStep < 1000) {
                blockStep = 1000;
            }
            toBlock = 0;
            await sleep(2000);
            continue;
        }

        
    }

    return Array.from(blockSet);
}

CurveHistoryFetcher();