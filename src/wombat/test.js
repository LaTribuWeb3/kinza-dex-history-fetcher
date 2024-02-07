// index.js
const { BigNumber } = require('bignumber.js');
const dotenv = require('dotenv');
const CoreV2 = require('./wombat.utils');
const { ethers, Contract } = require('ethers');
const { providers } = require('@0xsequence/multicall');
const { wombatPools } = require('./wombat.config');
const { wombatAbis } = require('../utils/abis');
const { getTokenSymbolByAddress, normalize } = require('../utils/token.utils');
dotenv.config();

// Instantiate CoreV2
const RPC_URL = process.env.WOMBAT_RPC_URL;

async function TestFunction(amountIn) {
  //instantiate RPC
  const web3Provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL);
  const multicallProvider = new providers.MulticallProvider(web3Provider);
  const pool = wombatPools[1];
  const poolContract = new Contract(pool.poolAddress, pool.poolAbi, multicallProvider);

  //get poolTokens
  const poolTokens = await poolContract.getTokens();
  //get wombat AssetTokens
  const poolAssets = [];
  for (const token of poolTokens) {
    poolAssets.push(await poolContract.addressOfAsset(token));
  }

  const poolAssetsContracts = [];
  for (const tokenAddress of poolAssets) {
    poolAssetsContracts.push(new Contract(tokenAddress, wombatAbis.wombatPoolAssetAbi, multicallProvider));
  }
  const promises = [];
  promises.push(poolContract.ampFactor());
  for (const contract of poolAssetsContracts) {
    promises.push(contract.cash());
    promises.push(contract.liability());
  }

  const promisesResults = await Promise.all(promises);

  // Define parameters for the swap quote function
  let Ax = undefined; // token X with 18 decimals
  let Ay = undefined; // token Y with 18 decimals
  let Lx = undefined; // token X liability with 18 decimals
  let Ly = undefined; // token Y liability with 18 decimals
  let A = undefined; // Amplification factor with 18 decimals
  const Dx = new BigNumber(amountIn).times(new BigNumber(10).pow(18)); // token X delta (amount inputted) with 18 decimals

  for (let i = 0; i < promisesResults.length; i++) {
    if (i === 0) {
      A = promisesResults[i].toString(10);
    }
    if (i === 1) {
      Ax = promisesResults[i].toString(10);
    }
    if (i === 2) {
      Lx = promisesResults[i].toString(10);
    }
    if (i === 3) {
      Ay = promisesResults[i].toString(10);
    }
    if (i === 4) {
      Ly = promisesResults[i].toString(10);
    }
  }
  console.log('pool', pool.poolName);
  console.log('pool address', pool.poolAddress);
  console.log('X token:', getTokenSymbolByAddress(poolTokens[0]));
  console.log('X token Address:', poolTokens[0]);
  console.log('Y token:', getTokenSymbolByAddress(poolTokens[1]));
  console.log('Y token Address:', poolTokens[1]);

  // Call the onchain swap quote function
  const onchainSmartContractQuote = await poolContract.quotePotentialSwap(
    poolTokens[0],
    poolTokens[1],
    Dx.toString(10)
  );

  // Call the swap quote function
  const coreV2 = new CoreV2();
  const quote = coreV2._swapQuoteFunc(Ax, Ay, Lx, Ly, Dx, A);

  // Output the result
  const decimals = new BigNumber(10).pow(18);
  console.log(
    `Onchain - ${amountIn} ${getTokenSymbolByAddress(poolTokens[0])} swapped for ${normalize(
      onchainSmartContractQuote.potentialOutcome,
      18
    )} ${getTokenSymbolByAddress(poolTokens[1])}`
  );
  console.log(
    `Local Core v2 - ${amountIn} ${getTokenSymbolByAddress(poolTokens[0])} swapped for ${quote.div(decimals)} ${getTokenSymbolByAddress(poolTokens[1])}`
  );
}

TestFunction(100000);
