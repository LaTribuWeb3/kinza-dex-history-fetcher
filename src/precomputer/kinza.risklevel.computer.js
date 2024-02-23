const { ethers } = require('ethers');
const { sleep, fnName, roundTo, retry } = require('../utils/utils');
const { default: axios } = require('axios');
const { RecordMonitoring } = require('../utils/monitoring');
const { pairsToCompute } = require('./kinza.risklevel.computer.config');
const { protocolDataProviderAddress } = require('./kinza.risklevel.computer.config');
const { protocolDataProviderABI } = require('./kinza.risklevel.computer.config');
const { getRollingVolatility, getLiquidityAll } = require('../data.interface/data.interface');
const path = require('path');
const { DATA_DIR, BLOCK_PER_DAY } = require('../utils/constants');
const fs = require('fs');
const { WaitUntilDone, SYNC_FILENAMES } = require('../utils/sync');
const { computeAverageSlippageMap } = require('../data.interface/internal/data.interface.liquidity');
const { getConfTokenBySymbol } = require('../utils/token.utils');

const RPC_URL = process.env.RPC_URL;
const web3Provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL);
const RUN_EVERY_MINUTES = process.env.RUN_EVERY || 3 * 60; // in minutes
const MONITORING_NAME = 'Kinza Risk Level';

/**
 * Precompute data for the risk oracle front
 */
async function precomputeRiskLevelKinza(onlyOnce = false) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await WaitUntilDone(SYNC_FILENAMES.FETCHERS_LAUNCHER);
    const runStartDate = Date.now();
    try {
      await RecordMonitoring({
        name: MONITORING_NAME,
        status: 'running',
        lastStart: Math.round(runStartDate / 1000),
        runEvery: RUN_EVERY_MINUTES * 60
      });

      const dirPath = path.join(DATA_DIR, 'precomputed', 'dashboard');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const promises = [];
      for (const base of Object.keys(pairsToCompute)) {
        const promise = computeDataForPair(base, pairsToCompute[base]);
        await promise;
        promises.push(promise);
      }

      const allPairs = await Promise.all(promises);

      const kinzaOverview = {};
      for (const pair of allPairs) {
        for (const base of Object.keys(pair)) {
          kinzaOverview[base] = pair[base];
        }
      }

      const stringified = JSON.stringify(kinzaOverview, null, 2);
      console.log(stringified);
      fs.writeFileSync(path.join(dirPath, 'kinza-overview.json'), stringified);
    } catch (error) {
      console.error(error);
      const errorMsg = `An exception occurred: ${error}`;
      console.log(errorMsg);
      await RecordMonitoring({
        name: MONITORING_NAME,
        status: 'error',
        error: errorMsg
      });
    }

    const runEndDate = Math.round(Date.now() / 1000);
    await RecordMonitoring({
      name: MONITORING_NAME,
      status: 'success',
      lastEnd: runEndDate,
      lastDuration: runEndDate - Math.round(runStartDate / 1000)
    });

    if (onlyOnce) {
      return;
    }

    const sleepTime = RUN_EVERY_MINUTES * 60 * 1000 - (Date.now() - runStartDate);
    if (sleepTime > 0) {
      console.log(`${fnName()}: sleeping ${roundTo(sleepTime / 1000 / 60)} minutes`);
      await sleep(sleepTime);
    }
  }
}

async function computeDataForPair(base, quotes) {
  // const subMarkets = await Promise.all(quotes.map(async (quote) => await computeSubMarket(base, quote)));
  const subMarkets = [];
  for (let quote of quotes) {
    const newSubMarket = await computeSubMarket(base, quote);
    subMarkets.push(newSubMarket);
  }

  let riskLevel = Math.max(...subMarkets.map((_) => _.riskLevel));
  let data = {};
  data[base] = {
    riskLevel: riskLevel,
    subMarkets: subMarkets
  };
  return data;
}

async function computeSubMarket(base, quote) {
  console.log(`computeSubMarket[${base}/${quote}]: starting`);
  const baseConf = getConfTokenBySymbol(base);
  const quoteConf = getConfTokenBySymbol(quote);
  const baseTokenAddress = baseConf.address;
  const quoteTokenAddress = quoteConf.address;
  const protocolDataProviderContract = new ethers.Contract(
    protocolDataProviderAddress,
    protocolDataProviderABI,
    web3Provider
  );

  const baseReserveCaps = await retry(protocolDataProviderContract.getReserveCaps, [baseConf.address]);
  const quoteReserveCaps = await retry(protocolDataProviderContract.getReserveCaps, [quoteConf.address]);
  const reserveDataConfigurationQuote = await retry(protocolDataProviderContract.getReserveConfigurationData, [
    quoteTokenAddress
  ]);

  const baseTokenInfo = await axios.get(
    'https://coins.llama.fi/prices/current/bsc:' + baseTokenAddress + ',bsc:' + quoteTokenAddress
  );

  // const volatility = getRollingVolatility();

  let riskLevel = 0.0;

  const liquidationBonusBps = reserveDataConfigurationQuote.liquidationBonus.toNumber() - 10000;
  const borrowCap = baseReserveCaps.borrowCap.toNumber(); // already with the good amount of decimals, no need to normalize
  const ltvBps = reserveDataConfigurationQuote.ltv.toNumber();

  const currentBlock = (await web3Provider.getBlockNumber()) - 10;
  const blockNumberThirtyDaysAgo = currentBlock - 30 * BLOCK_PER_DAY; // Current block minus 30 days
  const fullLiquidity = getLiquidityAll(base, quote, blockNumberThirtyDaysAgo, currentBlock);
  const averageLiquidityOn30Days = computeAverageSlippageMap(fullLiquidity);

  const volatility = await getRollingVolatility('all', base, quote, web3Provider);

  if (!volatility) {
    throw new Error(`Cannot find volatility for ${base}/${quote}`);
  }

  const liquidity = averageLiquidityOn30Days.slippageMap[liquidationBonusBps].base;
  const selectedVolatility = volatility.latest.current;
  riskLevel = findRiskLevelFromParameters(
    selectedVolatility,
    liquidity,
    liquidationBonusBps / 10000,
    ltvBps / 10000,
    borrowCap
  );
  const pairValue = {
    quote: quote,
    riskLevel: riskLevel,
    LTV: ltvBps / 10000,
    liquidationBonus: liquidationBonusBps / 10000,
    supplyCapUsd: baseTokenInfo.data.coins['bsc:' + baseTokenAddress].price * baseReserveCaps.supplyCap.toNumber(),
    supplyCapInKind: baseReserveCaps.supplyCap.toNumber(),
    borrowCapUsd: baseTokenInfo.data.coins['bsc:' + quoteTokenAddress].price * quoteReserveCaps.borrowCap.toNumber(),
    borrowCapInKind: quoteReserveCaps.borrowCap.toNumber(),
    volatility: selectedVolatility,
    liquidity: liquidity
  };

  console.log(`computeSubMarket[${base}/${quote}]: result:`, pairValue);
  return pairValue;
}

function findRiskLevelFromParameters(
  volatility /* de la pair */,
  liquidity /* from CSV file à 30 jours (from block to block) */,
  liquidationBonus,
  ltv,
  borrowCap
) {
  const sigma = volatility;
  const d = borrowCap;
  const beta = liquidationBonus;
  const l = liquidity;

  const sigmaTimesSqrtOfD = sigma * Math.sqrt(d);
  const ltvPlusBeta = ltv + beta;
  const lnOneDividedByLtvPlusBeta = Math.log(1 / ltvPlusBeta);
  const lnOneDividedByLtvPlusBetaTimesSqrtOfL = lnOneDividedByLtvPlusBeta * Math.sqrt(l);
  const r = sigmaTimesSqrtOfD / lnOneDividedByLtvPlusBetaTimesSqrtOfL;

  return r;
}

// precomputeRiskLevelKinza();

module.exports = { precomputeRiskLevelKinza };
