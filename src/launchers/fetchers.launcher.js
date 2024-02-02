const { fnName, roundTo, sleep } = require('../utils/utils');

const dotenv = require('dotenv');
dotenv.config();
const { PrecomputeMedianPrices } = require('../precomputer/median.precomputer');
const { UpdateSyncFile, SYNC_FILENAMES } = require('../utils/sync');
const { pancakeswapV2HistoryFetcher } = require('../pancakeswap.v2/pancakeswap.v2.history.fetcher');
const { pancakeswapV3HistoryFetcher } = require('../pancakeswap.v3/pancakeswap.v3.history.fetcher');
const { pancakeswapV3PriceHistoryFetcher } = require('../pancakeswap.v3/pancakeswap.v3.price.history.fetcher');

const RUN_EVERY_MINUTES = 60;

const fetchersToStart = [
    pancakeswapV2HistoryFetcher,
    pancakeswapV3HistoryFetcher,
    pancakeswapV3PriceHistoryFetcher,
    PrecomputeMedianPrices,
];

async function LaunchFetchers() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const start = Date.now();
        try {
            UpdateSyncFile(SYNC_FILENAMES.FETCHERS_LAUNCHER, true);
            for(const fct of fetchersToStart) {
                console.log(`Starting ${fct.name}`);
                await fct(true); 
                console.log(`${fct.name} ended`);
                console.log('------------------------------------------------------------');
            }
            UpdateSyncFile(SYNC_FILENAMES.FETCHERS_LAUNCHER, false);
        } catch(error) {
            const errorMsg = `An exception occurred: ${error}`;
            console.log(errorMsg);
        }

        console.log(`LauncherFetchers took ${(Date.now() - start)/1000} seconds to run`);
        const sleepTime = RUN_EVERY_MINUTES * 60 * 1000 - (Date.now() - start);
        if(sleepTime > 0) {
            console.log(`${fnName()}: sleeping ${roundTo(sleepTime/1000/60)} minutes`);
            await sleep(sleepTime);
        }
    }
}

LaunchFetchers();
