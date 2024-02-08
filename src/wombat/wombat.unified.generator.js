const { wombatPricePairs } = require('./wombat.config');
const { DATA_DIR } = require('../utils/constants');
const fs = require('fs');
const path = require('path');
const CoreV2 = require('./wombat.core.v2');
const { default: BigNumber } = require('bignumber.js');
const { normalize } = require('../utils/token.utils');

async function main() {
  const coreV2 = new CoreV2();
  for (const pool of wombatPricePairs) {
    const poolData = extractPoolCSV(pool);
    console.log(typeof poolData);
    for (const line of poolData) {
      const blockNumber = line['blocknumber'];
      const A = line['ampFactor'];
      const haircutRate = line['haircutRate'];
      const startCovRatio = line['startCovRatio'];
      const endCovRatio = line['endCovRatio'];
      for (const pair of pool.pairs) {
        const Ax = line.tokenData[pair.token0].cash;
        const Ay = line.tokenData[pair.token1].cash;
        const Lx = line.tokenData[pair.token0].liability;
        const Ly = line.tokenData[pair.token1].liability;

        // getting the price for 1 token0 in token1
        const oneToken0 = new BigNumber(10).pow(18).toString(10);
        let price = coreV2._HighCovRatioFeePoolV2QuoteFrom(
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
        // computing the slippage map
        const slippageMap = {};
        let lastAmount = oneToken0;
        for (let slippageBps = 50; slippageBps <= 2000; slippageBps += 50) {
          const targetPrice = price - (price * slippageBps) / 10000;
        }
      }
    }
  }

  /**
   * Extracts and processes CSV data for a given pool, organizing token-related data
   * under a nested 'tokenData' object within each row's representation.
   *
   * @param {Object} pool - An object representing the pool, including its name.
   * @returns {Array<Object>} An array of objects, each representing a row from the CSV,
   * with token data structured under 'tokenData'.
   */
  function extractPoolCSV(pool) {
    // Construct the file path for the pool's CSV file
    const filePath = path.join(DATA_DIR, 'wombat', `${pool.poolName}_wombat.csv`);
    // Read the content of the CSV file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Split the file content into lines, handling both Unix and Windows line endings
    let lines = fileContent.split(/\r?\n/);

    // Discard the last line if it is empty, which is common in many CSV files
    if (lines[lines.length - 1] === '') {
      lines.pop();
    }

    // The first line contains headers, which are extracted and split into an array
    const headers = lines.shift().split(',');

    // Process each subsequent line of the CSV
    const data = lines.map((line) => {
      const values = line.split(',');
      const rowData = headers.reduce((obj, header, index) => {
        // Use a regular expression to identify headers that indicate token-related data
        const tokenMatch = header.match(/(cash|liability)_(\w+)/);
        if (tokenMatch) {
          // Extract the type (cash or liability) and token name from the header
          const [, type, token] = tokenMatch;
          // Ensure the 'tokenData' object exists and then initialize or update
          // the specific token's data within it
          obj.tokenData = obj.tokenData || {};
          obj.tokenData[token] = obj.tokenData[token] || {};
          obj.tokenData[token][type] = values[index];
        } else {
          // For headers not related to tokens, directly assign their values to the row object
          obj[header] = values[index];
        }
        return obj;
      }, {});

      return rowData;
    });

    return data;
  }
}
main();
