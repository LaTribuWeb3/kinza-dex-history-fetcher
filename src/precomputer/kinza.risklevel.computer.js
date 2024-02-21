const { getBlocknumberForTimestamp } = require('../utils/web3.utils');
const { ethers } = require('ethers');
const { sleep, fnName, roundTo, logFnDurationWithLabel, retry } = require('../utils/utils');
const { default: axios } = require('axios');
const { RecordMonitoring } = require('../utils/monitoring');
const { pairsToCompute } = require('./kinza.risklevel.computer.config');
const { protocolDataProviderAddress } = require('./kinza.risklevel.computer.config');
const { protocolDataProviderABI } = require('./kinza.risklevel.computer.config');
const { getLiquidity, getVolatility, getRollingVolatility, getLiquidityAll } = require('../data.interface/data.interface');
const path = require('path');
const { SPANS, PLATFORMS, DATA_DIR, TARGET_SLIPPAGES } = require('../utils/constants');
const fs = require('fs');
const { WaitUntilDone, SYNC_FILENAMES } = require('../utils/sync');


const RPC_URL = process.env.RPC_URL;
const web3Provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL);
const RUN_EVERY_MINUTES = process.env.RUN_EVERY || 3 * 60; // in minutes
const MONITORING_NAME = 'Kinza Risk Level V2';

/**
 * Precompute data for the risk oracle front
 */
async function precomputeRiskLevelKinza() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        await WaitUntilDone(SYNC_FILENAMES.FETCHERS_LAUNCHER);
        const runStartDate = Date.now();
        try {
            await RecordMonitoring({
                'name': MONITORING_NAME,
                'status': 'running',
                'lastStart': Math.round(runStartDate / 1000),
                'runEvery': RUN_EVERY_MINUTES * 60
            });

            const dirPath = path.join(DATA_DIR, 'precomputed', 'riskoracle');
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            // const protocolDataProviderContract = new ethers.Contract(protocolDataProviderAddress, protocolDataProviderABI, web3Provider);

            // const tokens = await protocolDataProviderContract.getAllReservesTokens();

            let allPairs = await Promise.all(Object.keys(pairsToCompute).map(async (key) => await computeDataForPair(key, pairsToCompute[key])));

            // let result = await Promise.all(
            //     tokens.map(async (_) => {
            //         const reserveCaps = await protocolDataProviderContract.getReserveCaps(_.tokenAddress);
            //         return { symbol: _.symbol, tokenAddress: _.tokenAddress, borrowCap: reserveCaps.borrowCap.toString(), supplyCap: reserveCaps.supplyCap.toString() };
            //     })
            // );

            console.log(JSON.stringify(allPairs, null, 2));
        } catch (error) {
            console.error(error);
            const errorMsg = `An exception occurred: ${error}`;
            console.log(errorMsg);
            await RecordMonitoring({
                'name': MONITORING_NAME,
                'status': 'error',
                'error': errorMsg
            });
        }

        const runEndDate = Math.round(Date.now() / 1000);
        await RecordMonitoring({
            'name': MONITORING_NAME,
            'status': 'success',
            'lastEnd': runEndDate,
            'lastDuration': runEndDate - Math.round(runStartDate / 1000)
        });

        const sleepTime = RUN_EVERY_MINUTES * 60 * 1000 - (Date.now() - runStartDate);
        if (sleepTime > 0) {
            console.log(`${fnName()}: sleeping ${roundTo(sleepTime / 1000 / 60)} minutes`);
            await sleep(sleepTime);
        }
    }
}

async function computeDataForPair(base, quotes) {
    // const subMarkets = await Promise.all(quotes.map(async (quote) => await computeSubMarket(base, quote)));
    let subMarkets = [];
    for (let quote of quotes) {
        let newSubMarket = await computeSubMarket(base, quote);
        subMarkets.push(newSubMarket);
    }
    let totalRiskLevel = 0.0;
    for (const subMarket of subMarkets) {
        totalRiskLevel += subMarket.riskLevel;
    }
    let data = {};
    data[base] = {
        'riskLevel': totalRiskLevel / subMarkets.length,
        'subMarkets': subMarkets
    };
    return data;
}

async function computeSubMarket(base, quote) {
    const protocolDataProviderContract = new ethers.Contract(protocolDataProviderAddress, protocolDataProviderABI, web3Provider);

    const allTokens = await retry(protocolDataProviderContract.getAllReservesTokens, []);

    const baseTokenAddress = allTokens.filter((_) => _.symbol == base)[0].tokenAddress;
    const quoteTokenAddress = allTokens.filter((_) => _.symbol == quote)[0].tokenAddress;

    const baseReserveCaps = await retry(protocolDataProviderContract.getReserveCaps, [baseTokenAddress]);
    const quoteReserveCaps = await retry(protocolDataProviderContract.getReserveCaps, [quoteTokenAddress]);
    const reserveDataConfigurationQuote = await retry(protocolDataProviderContract.getReserveConfigurationData, [quoteTokenAddress]);

    const baseTokenInfo = await axios.get('https://coins.llama.fi/prices/current/bsc:' + baseTokenAddress + ',bsc:' + quoteTokenAddress);

    // const volatility = getRollingVolatility();

    let riskLevel = 0.0;

    const currentBlock = await web3Provider.getBlockNumber() - 10;
    const blockNumberThirtyDaysAgo = currentBlock - 30 * 24 * 3600 / 3; // Current block minus 30 days
    const fullLiquidity = getLiquidityAll(base, quote, blockNumberThirtyDaysAgo, currentBlock);
    const averageLiquidityOn30Days = Object.entries(fullLiquidity)
        .map((_) => _[1])
        .map(liquidity => liquidity.price)
        .reduce((acc, val) => { return acc + (val === undefined ? 0 : val); }, 0) / Object.entries(fullLiquidity).length;

    const volatility = await getRollingVolatility('all', base, quote, web3Provider); // take the last one

    if (volatility !== undefined)
        riskLevel = findRiskLevelFromParameters(volatility[-1].latest.current, averageLiquidityOn30Days, reserveDataConfigurationQuote.liquidationBonus - 1, reserveDataConfigurationQuote.ltv);

    return {
        'quote': quote,
        'riskLevel': riskLevel,
        'LTV': reserveDataConfigurationQuote.ltv.toNumber(),
        'liquidationBonus': reserveDataConfigurationQuote.liquidationBonus - 1,
        'supplyCapUsd': baseTokenInfo.data.coins['bsc:' + baseTokenAddress].price * baseReserveCaps.supplyCap,
        'supplyCapInKind': baseReserveCaps.supplyCap.toNumber(),
        'borrowCapUsd': baseTokenInfo.data.coins['bsc:' + quoteTokenAddress].price * quoteReserveCaps.supplyCap,
        'borrowCapInKind': quoteReserveCaps.borrowCap.toNumber()
    };
}

function findRiskLevelFromParameters(volatility /* de la pair */, liquidity /* from CSV file à 30 jours (from block to block) */, liquidationBonus, ltv, borrowCap) {
    const sigma = volatility;
    const d = borrowCap;
    const beta = liquidationBonus;
    const l = liquidity;
    ltv = Number(ltv) / 100;

    const sigmaTimesSqrtOfD = sigma * Math.sqrt(d);
    const ltvPlusBeta = ltv + beta;
    const lnOneDividedByLtvPlusBeta = Math.log(1 / ltvPlusBeta);
    const lnOneDividedByLtvPlusBetaTimesSqrtOfL = lnOneDividedByLtvPlusBeta * Math.sqrt(l);
    const r = sigmaTimesSqrtOfD / lnOneDividedByLtvPlusBetaTimesSqrtOfL;

    return r;
}

precomputeRiskLevelKinza();