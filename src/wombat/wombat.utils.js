const { DATA_DIR } = require('../utils/constants');
const fs = require('fs');
const path = require('path');

function wombatGetAddressBySymbol(tokens, symbol) {
  const token = tokens.find((token) => token.symbol === symbol);
  return token ? token.address : 'Token not found';
}

async function findValidBlockTag(poolContract, startBlock, endBlock) {
  // Check if the call succeeds with the startBlock immediately
  try {
    await poolContract.endCovRatio({ blockTag: startBlock });
    // If the call succeeds, return startBlock as it's already valid
    return startBlock;
  } catch (error) {
    // If the call fails, proceed with the binary search between startBlock + 1 and endBlock
    console.log(`Call failed for startBlock ${startBlock}, proceeding with binary search.`);
  }

  let left = startBlock + 1; // Start the search from the next block after startBlock
  let right = endBlock;
  let mid;
  let validBlockTag = -1;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    try {
      await poolContract.endCovRatio({ blockTag: mid });
      // If the call succeeds, store mid as a potential answer and try to find a smaller value
      validBlockTag = mid;
      right = mid - 1;
    } catch (error) {
      // If the call fails, discard the left half and proceed with the right half
      left = mid + 1;
    }
  }

  return validBlockTag; // This will be the smallest value of i for which the call does not fail
}

function updateWombatPoolConfig(key, value) {
  const filePath = path.join(DATA_DIR, 'wombat', 'wombat-pool-config.json');

  // Read the existing file or create a new object if the file does not exist
  fs.readFileSync(filePath, 'utf8', (err, data) => {
    let currentData = {};
    if (!err) {
      try {
        currentData = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing the pool starting block config.', parseErr);
        return;
      }
    }

    // Add or update the key-value pair
    currentData[key] = value;

    // Convert the updated object back to a JSON string
    const jsonData = JSON.stringify(currentData, null, 2);

    // Write the updated JSON string back to the file
    fs.writeFileSync(filePath, jsonData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('An error occurred while updating the pool config with its starting block value', writeErr);
        return;
      }
      console.log('The the pool config has successfully been updated with its starting block value.');
    });
  });
}
function readWombatPoolStartBlock(poolAddress) {
  try {
    const filePath = path.join(DATA_DIR, 'wombat', 'wombat-pool-config.json');
    // Read the file contents synchronously
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

module.exports = { wombatGetAddressBySymbol, findValidBlockTag, readWombatPoolStartBlock, updateWombatPoolConfig };
