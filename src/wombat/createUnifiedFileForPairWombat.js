const { DATA_DIR } = require('../utils/constants');
const fs = require('fs');
const path = require('path');
const CoreV2 = require('./wombat.core.v2');
const { default: BigNumber } = require('bignumber.js');
const { normalize } = require('../utils/token.utils');
const { computeLiquidityForSlippageWombatPool, extractPoolCSV } = require('./wombat.utils');
const { fnName, readLastLine } = require('../utils/utils');
const { BN_1e18 } = require('./wombat.unified.generator');

async function createUnifiedFileForPairWombat(blockLastYear, fromSymbol, toSymbol, poolName) {
  const coreV2 = new CoreV2();

  console.log(`${fnName()}: create/append for ${fromSymbol} ${toSymbol} for pools ${poolName}`);
  const unifiedFilename = `${fromSymbol}-${toSymbol}-${poolName}-unified-data.csv`;
  const unifiedFullFilename = path.join(DATA_DIR, 'precomputed', 'wombat', unifiedFilename);
  let sinceBlock = 0;
  if (!fs.existsSync(unifiedFullFilename)) {
    fs.writeFileSync(unifiedFullFilename, 'blocknumber,price,slippagemap\n');
  } else {
    const lastLine = await readLastLine(unifiedFullFilename);
    sinceBlock = Number(lastLine.split(',')[0]) + 1;
    if (isNaN(sinceBlock)) {
      sinceBlock = 0;
    }
  }

  if (sinceBlock == 0) {
    sinceBlock = blockLastYear;
  }

  const poolData = extractPoolCSV(poolName);
  for (const line of poolData) {
    if (line.blocknumber < sinceBlock) {
      continue;
    }

    console.log(`Working on pool ${poolName}/${fromSymbol}/${toSymbol} at block ${line.blocknumber}`);
    const A = line.ampFactor;
    const haircutRate = line.haircutRate;
    const startCovRatio = line.startCovRatio;
    const endCovRatio = line.endCovRatio;
    const Ax = line.tokenData[fromSymbol].cash;
    const Ay = line.tokenData[toSymbol].cash;
    const Lx = line.tokenData[fromSymbol].liability;
    const Ly = line.tokenData[toSymbol].liability;

    // getting the price for 1 token0 in token1
    const oneToken0 = BN_1e18;
    const qtyToResp = coreV2._HighCovRatioFeePoolV2QuoteFrom(
      Ax,
      Ay,
      Lx,
      Ly,
      oneToken0,
      A,
      haircutRate,
      startCovRatio,
      endCovRatio
    );
    const price = normalize(qtyToResp.actualToAmount.toString(), 18);
    // computing the slippage map
    const slippageMap = {};
    for (let slippageBps = 50; slippageBps <= 2000; slippageBps += 50) {
      const targetPrice = price - (price * slippageBps) / 10000;
      const liquidityObj = computeLiquidityForSlippageWombatPool(
        BN_1e18,
        targetPrice,
        Ax,
        Ay,
        Lx,
        Ly,
        A,
        startCovRatio,
        endCovRatio,
        haircutRate
      );
      const liquidityAtSlippage = normalize(liquidityObj.base.toString(10), 18);
      const quoteObtainedAtSlippage = normalize(liquidityObj.quote.toString(10), 18);
      slippageMap[slippageBps] = { base: liquidityAtSlippage, quote: quoteObtainedAtSlippage };
    }

    // console.log({ price }, { slippageMap });
    fs.appendFileSync(unifiedFullFilename, `${line.blocknumber},${price},${JSON.stringify(slippageMap)}\n`);
  }
}
