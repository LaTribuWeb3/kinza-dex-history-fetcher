const path = require('path');
const fs = require('fs');
const { fnName, readLastLine } = require('../utils/utils');
const { getAvailablepancakeswapV2, getUniV2DataforBlockInterval, computeLiquidityUniV2Pool, computepancakeswapV2Price } = require('./pancakeswap.v2.utils');
const { getConfTokenBySymbol, normalize } = require('../utils/token.utils');
const { DATA_DIR } = require('../utils/constants');
const { getBlocknumberForTimestamp } = require('../utils/web3.utils');
const { truncateUnifiedFiles } = require('../data.interface/unified.truncator');


async function generateUnifiedFileUniv2(endBlock) {
    const available = getAvailablepancakeswapV2(DATA_DIR);

    if(!fs.existsSync(path.join(DATA_DIR, 'precomputed', 'pancakeswapv2'))) {
        fs.mkdirSync(path.join(DATA_DIR, 'precomputed', 'pancakeswapv2'), {recursive: true});
    }

    if(!fs.existsSync(path.join(DATA_DIR, 'precomputed', 'price', 'pancakeswapv2'))) {
        fs.mkdirSync(path.join(DATA_DIR, 'precomputed', 'price', 'pancakeswapv2'), {recursive: true});
    }

    for(const base of Object.keys(available)) {
        for(const quote of available[base]) {
            await createUnifiedFileForPair(endBlock, base, quote);
        }
    }

    const blockLastYear = await getBlocknumberForTimestamp(Math.round(Date.now()/1000) - 365 * 24 * 60 * 60);
    truncateUnifiedFiles('pancakeswapv2', blockLastYear);
}

async function createUnifiedFileForPair(endBlock, fromSymbol, toSymbol) {
    console.log(`${fnName()}: create/append for ${fromSymbol} ${toSymbol}`);
    const unifiedFilename = `${fromSymbol}-${toSymbol}-unified-data.csv`;
    const unifiedFullFilename = path.join(DATA_DIR, 'precomputed', 'pancakeswapv2', unifiedFilename);
    const unifiedFullFilenamePrice = path.join(DATA_DIR, 'precomputed', 'price', 'pancakeswapv2', unifiedFilename);
    let sinceBlock = 0;
    let toWrite = [];
    let toWritePrice = [];
    if(!fs.existsSync(unifiedFullFilename)) {
        fs.writeFileSync(unifiedFullFilename, 'blocknumber,price,slippagemap\n');
    } else {
        const lastLine = await readLastLine(unifiedFullFilename);
        sinceBlock = Number(lastLine.split(',')[0]) + 1;
        if(isNaN(sinceBlock)) {
            sinceBlock = 0;
        }
    }

    if(!fs.existsSync(unifiedFullFilenamePrice)) {
        fs.writeFileSync(unifiedFullFilenamePrice, 'blocknumber,price\n');
    }

    console.log(`${fnName()}: getting data since ${sinceBlock} to ${endBlock}`);
    const univ2Data = await getUniV2DataforBlockInterval(DATA_DIR, fromSymbol, toSymbol, sinceBlock, endBlock);
    const fromConf = getConfTokenBySymbol(fromSymbol);
    const toConf = getConfTokenBySymbol(toSymbol);

    let lastSavedBlock = sinceBlock-1;
    for(const [blockNumber, data] of Object.entries(univ2Data)) {
        const normalizedFrom = normalize(data.fromReserve, fromConf.decimals);
        const normalizedTo = normalize(data.toReserve, toConf.decimals);
        const price = computepancakeswapV2Price(normalizedFrom, normalizedTo);
        
        // only save every 50 blocks
        if(lastSavedBlock + 50 > blockNumber) {
            // just save the price
            toWritePrice.push(`${blockNumber},${price}\n`);
            continue;
        }
        
        const slippageMap = {};
        for(let slippageBps = 50; slippageBps <= 2000; slippageBps += 50) {
            slippageMap[slippageBps] = computeLiquidityUniV2Pool(normalizedFrom, normalizedTo, slippageBps/10000);
        }

        lastSavedBlock = Number(blockNumber);
        toWrite.push(`${blockNumber},${price},${JSON.stringify(slippageMap)}\n`);
        toWritePrice.push(`${blockNumber},${price}\n`);
    }

    if(toWrite.length == 0) {
        console.log(`${fnName()}: nothing to add to file`);
    } else {
        fs.appendFileSync(unifiedFullFilename, toWrite.join(''));
    }

    if(toWritePrice.length == 0) {
        console.log(`${fnName()}: nothing to add to price file`);
    } else {
        fs.appendFileSync(unifiedFullFilenamePrice, toWritePrice.join(''));
    }
}

// generateUnifiedFileUniv2(18000000);

module.exports = { generateUnifiedFileUniv2 };