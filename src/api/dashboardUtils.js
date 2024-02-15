const fs = require('fs');
const path = require('path');
const { DATA_DIR, PLATFORMS } = require('../utils/constants');
const dirPath = path.join(DATA_DIR, 'precomputed', 'dashboard');

function getFetcherResults() {
  const fetcherResults = [];
  for (const platform of PLATFORMS) {
    const filename = path.join(DATA_DIR, platform, `${platform}-fetcher-result.json`);
    console.log(`getting ${filename}`);
    if (fs.existsSync(filename)) {
      fetcherResults.push(JSON.parse(fs.readFileSync(filename)));
    }
  }

  return fetcherResults;
}
function getAvailableForDashboard(platform) {
  
  let availableFiles = fs.readdirSync(dirPath).filter((_) => _.endsWith('.json') && _.includes(platform));
  if(platform === 'pancake'){
    availableFiles = fs.readdirSync(dirPath).filter((_) => _.endsWith('.json') && _.includes('pancake') && !_.includes('pancakev2') && !_.includes('pancakev3'));
  }

  const results = [];
  for (const file of availableFiles) {
    const base = file.split('-')[0];
    const quote = file.split('-')[1];
    results.push({ base, quote });
  }

  return results;
}

function getDataForPairAndPlatform(platform, base, quote) {
  const searchFilename = path.join(dirPath, `${base}-${quote}-${platform}.json`);
  if (!fs.existsSync(searchFilename)) {
    throw new Error(`Could not find data for ${base} ${quote} and ${platform}`);
  }
  return JSON.parse(fs.readFileSync(searchFilename));
}

function checkPlatform(platform) {
  if (platform != 'all') {
    if (!PLATFORMS.includes(platform)) {
      throw new Error(`Unknown platform ${platform}`);
    }
  }
}

module.exports = { getAvailableForDashboard, getDataForPairAndPlatform, checkPlatform, getFetcherResults };
