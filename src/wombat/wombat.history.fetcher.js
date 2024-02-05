const { ethers, Contract } = require('ethers');
const dotenv = require('dotenv');
const { wombatPoolAbi } = require('./wombat.config');
const { DATA_DIR } = require('../utils/constants');
const fs = require('fs');
const path = require('path');
dotenv.config();

// const RPC_URL = process.env.WOMBAT_RPC_URL;
const RPC_URL = process.env.WOMBAT_ALTERNATIVE_RPC_URL;

const runnerName = 'Wombat Fetcher';

async function WombatHistoryFetcher(onlyOnce = false) {
    if(!fs.existsSync(path.join(DATA_DIR, 'wombat'))) {
        fs.mkdirSync(path.join(DATA_DIR, 'wombat'), {recursive: true});
    }
    const currentBlock = await web3Provider.getBlockNumber() - 10;
    const web3Provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL);
    const testContract = new Contract('0x9D0a463D5dcB82008e86bF506eb048708a15dd84', wombatPoolAbi, web3Provider);
    const blockNum = 17732854;
    const testAnswer = await testContract.cash({ blockTag: blockNum });
    console.log(testAnswer.toString());
}

WombatHistoryFetcher();