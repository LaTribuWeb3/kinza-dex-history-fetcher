// index.js
const { BigNumber } = require('bignumber.js');
const CoreV2 = require('./wombat.utils');

// Instantiate CoreV2
const coreV2 = new CoreV2();

// Define parameters for the swap quote function
const Ax = new BigNumber('1000000000000000000'); // 1 token X with 18 decimals
const Ay = new BigNumber('2000000000000000000'); // 2 tokens Y with 18 decimals
const Lx = new BigNumber('500000000000000000'); // 0.5 token X liability with 18 decimals
const Ly = new BigNumber('1000000000000000000'); // 1 token Y liability with 18 decimals
const Dx = new BigNumber('300000000000000000'); // 0.3 token X delta (amount inputted) with 18 decimals
const A = new BigNumber('100000000000000000'); // Amplification factor with 18 decimals

// Call the swap quote function
const quote = coreV2._swapQuoteFunc(Ax, Ay, Lx, Ly, Dx, A);

// Output the result
console.log('Quote for the amount of token Y swapped for the inputted token X amount:', quote.toString());
