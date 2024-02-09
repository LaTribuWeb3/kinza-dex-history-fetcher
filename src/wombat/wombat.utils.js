const { DATA_DIR } = require('../utils/constants');
const fs = require('fs');
const path = require('path');

function wombatGetAddressBySymbol(tokens, symbol) {
  const token = tokens.find((token) => token.symbol === symbol);
  return token ? token.address : 'Token not found';
}

async function findValidBlockTag(poolContract, startBlock, endBlock) {
  console.log(`Starting search for valid block tag between ${startBlock} and ${endBlock}.`);

  // Check if the call succeeds with the startBlock immediately
  try {
    await poolContract.endCovRatio({ blockTag: startBlock });
    console.log(`Call succeeded for startBlock ${startBlock}, returning as valid block tag.`);
    return startBlock; // If the call succeeds, return startBlock as it's already valid
  } catch (error) {
    console.log(`Call failed for startBlock ${startBlock}, proceeding with binary search.`);
  }

  let left = startBlock + 1; // Start the search from the next block after startBlock
  let right = endBlock;
  let mid;
  let validBlockTag = -1;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    console.log(`Attempting call with blockTag ${mid}.`);
    try {
      await poolContract.endCovRatio({ blockTag: mid });
      console.log(`Call succeeded for blockTag ${mid}.`);
      validBlockTag = mid; // If the call succeeds, store mid as a potential answer
      right = mid - 1; // and try to find a smaller value
      console.log(`Adjusting search range to [${left}, ${right}].`);
    } catch (error) {
      console.log(`Call failed for blockTag ${mid}, discarding left half.`);
      left = mid + 1; // If the call fails, discard the left half and proceed with the right half
      console.log(`Adjusting search range to [${left}, ${right}].`);
    }
  }

  if (validBlockTag !== -1) {
    console.log(`Found valid block tag: ${validBlockTag}.`);
  } else {
    console.log(`No valid block tag found between ${startBlock} and ${endBlock}.`);
  }

  return validBlockTag; // This will be the smallest value of i for which the call does not fail
}

function updateWombatPoolConfig(key, value) {
  const filePath = path.join(DATA_DIR, 'wombat', 'wombat-pool-config.json');

  let currentData = {};

  // Check if the file exists before trying to read it
  if (fs.existsSync(filePath)) {
    // Read the existing file synchronously
    const data = fs.readFileSync(filePath, 'utf8');
    try {
      currentData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing the pool starting block config.', parseErr);
      return;
    }
  } else {
    console.log('File does not exist, creating a new one.');
  }

  // Add or update the key-value pair
  currentData[key] = value;

  // Convert the updated object back to a JSON string
  const jsonData = JSON.stringify(currentData, null, 2);

  // Write the updated JSON string back to the file synchronously
  try {
    fs.writeFileSync(filePath, jsonData, 'utf8');
    console.log('The pool config has successfully been updated with its starting block value.');
  } catch (writeErr) {
    console.error('An error occurred while updating the pool config with its starting block value', writeErr);
  }
}

function readWombatPoolStartBlock(poolAddress) {
  try {
    const filePath = path.join(DATA_DIR, 'wombat', 'wombat-pool-config.json');
    // Read the file contents synchronously
    if (!fs.existsSync(filePath)) {
      console.log('The pool config file does not exist yet.');
      return undefined;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    const currentData = JSON.parse(data);

    // Check if the key exists and return its value
    if (poolAddress in currentData) {
      return currentData[poolAddress];
    } else {
      return undefined; // Key not found
    }
  } catch (err) {
    console.error('An error occurred while reading or parsing the pool config :', err);
    return undefined; // Return undefined to indicate failure or absence of the key
  }
}

async function computeLiquidityForSlippageWombat(
  baseQty,
  targetPrice,
  Ax,
  Ay,
  Lx,
  Ly,
  A,
  haircutRate,
  startCovRatio,
  endCovRatio
) {
  let low = undefined;
  let high = undefined;
  let lowTo = undefined;
  let highTo = undefined;
  let qtyFrom = baseQty * 2n;
  const exitBoundsDiff = 0.1 / 100;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let { actualToAmount, } = this._HighCovRatioFeePoolV2QuoteFrom(
      Ax,
      Ay,
      Lx,
      Ly,
      qtyFrom,
      A,
      haircutRate,
      startCovRatio,
      endCovRatio
    );

    const newQtyTo = actualToAmount;

    const currentPrice = newQtyTo.dividedBy(qtyFrom);

    const variation = high && low ? high.dividedBy(low).minus(1).toNumber() : Infinity;

    if (low && high && variation < exitBoundsDiff) {
      const base = high.plus(low).dividedBy(2n);
      const quote = highTo.plus(lowTo).dividedBy(2n);
      return { base: base.toFixed(), quote: quote.toFixed() };
    }

    if (currentPrice.gt(targetPrice)) {
      low = qtyFrom;
      lowTo = newQtyTo;

      if (!high) {
        qtyFrom = qtyFrom.multipliedBy(2n);
      } else {
        qtyFrom = qtyFrom.plus(high.minus(low).dividedBy(2n));
      }
    } else {
      high = qtyFrom;
      highTo = newQtyTo;

      if (!low) {
        qtyFrom = qtyFrom.dividedBy(2n);
      } else {
        qtyFrom = qtyFrom.minus(high.minus(low).dividedBy(2n));
      }
    }
  }
}

module.exports = {
  wombatGetAddressBySymbol,
  computeLiquidityForSlippageWombat,
  findValidBlockTag,
  readWombatPoolStartBlock,
  updateWombatPoolConfig
};
