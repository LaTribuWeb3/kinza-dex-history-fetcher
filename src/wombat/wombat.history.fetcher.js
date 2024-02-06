const { ethers, Contract } = require('ethers');
const dotenv = require('dotenv');
const { wombatPools, wombatPoolAssetAbi } = require('./wombat.config');
const { DATA_DIR } = require('../utils/constants');
const fs = require('fs');
const path = require('path');
const { readLastLine } = require('../utils/utils');
const { providers } = require('@0xsequence/multicall');
const { getTokenSymbolByAddress } = require('../utils/token.utils');
dotenv.config();

const RPC_URL = process.env.WOMBAT_RPC_URL;
WombatHistoryFetcher();

async function WombatHistoryFetcher() {
  //check data dir exists
  if (!fs.existsSync(path.join(DATA_DIR, 'wombat'))) {
    fs.mkdirSync(path.join(DATA_DIR, 'wombat'), { recursive: true });
  }

  //instantiate RPC
  const web3Provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL);
  const multicallProvider = new providers.MulticallProvider(web3Provider);

  for (const pool of wombatPools) {
    await fetchHistoryForPool(pool, multicallProvider, web3Provider);
  }
}
async function fetchHistoryForPool(pool, multicallProvider, web3Provider) {
  const poolContract = new Contract(pool.poolAddress, pool.poolAbi, multicallProvider);

  //get poolTokens
  const poolTokens = await poolContract.getTokens();
  //get wombat AssetTokens
  const poolAssets = [];
  for (const token of poolTokens) {
    poolAssets.push(await poolContract.addressOfAsset(token));
  }

  const historyFileName = path.join(DATA_DIR, 'wombat', `${pool.poolName}_wombat.csv`);
  const currentBlock = (await web3Provider.getBlockNumber()) - 10;

  const blockStep = 1200;
  let startBlock = currentBlock - 10519200;
  if (fs.existsSync(historyFileName)) {
    const lastLine = await readLastLine(historyFileName);
    const lastLineBlock = Number(lastLine.split(',')[0]) + 1;
    if (!Number.isNaN(lastLineBlock)) {
      startBlock = lastLineBlock + blockStep - 1;
    }
  }

  ///if file does not exist, create it and write headers
  if (!fs.existsSync(historyFileName)) {
    let tokensStr = [];
    for (const token of poolTokens) {
      tokensStr.push(`cash_${getTokenSymbolByAddress(token)}`);
      tokensStr.push(`liability_${getTokenSymbolByAddress(token)}`);
    }

    fs.writeFileSync(historyFileName, `blocknumber,ampFactor,${tokensStr.join(',')}\n`);
  }

  const poolAssetsContracts = [];
  for (const tokenAddress of poolAssets) {
    poolAssetsContracts.push(new Contract(tokenAddress, wombatPoolAssetAbi, multicallProvider));
  }
  for (let i = startBlock; i + blockStep < currentBlock; i += blockStep) {
    const promises = [];
    promises.push(poolContract.ampFactor({ blockTag: i }));
    for (const contract of poolAssetsContracts) {
      promises.push(contract.cash({ blockTag: i }));
      promises.push(contract.liability({ blockTag: i }));
    }
    const promisesResults = await Promise.all(promises);
    const lineToWrite = promisesResults.map((_) => _.toString()).join(',');
    fs.appendFileSync(historyFileName, `${i},${lineToWrite}\n`);
  }
}
