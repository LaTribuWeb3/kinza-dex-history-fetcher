const tokens = {
    BNB: {
        decimals: 18,
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        dustAmount: 0.001
    },
    WBNB: {
        decmials: 18,
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        dustAmount: 0.001
    },
    BTCB: {
        decmials: 18,
        address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
        dustAmount: 0.000001
    },
    USDC: {
        decmials: 18,
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        dustAmount: 0.01
    },
    ETH: {
        decmials: 18,
        address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        dustAmount: 0.00001
    },
    USDT: {
        decmials: 18,
        address: '0x55d398326f99059fF775485246999027B3197955',
        dustAmount: 0.01
    },
    TUSD: {
        decmials: 18,
        address: '0x40af3827F39D0EAcBF4A168f8D4ee67c121D11c9',
        dustAmount: 0.01
    },
    FDUSD: {
        decmials: 18,
        address: '0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409',
        dustAmount: 0.01
    },
    wBETH: {
        decmials: 18,
        address: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
        dustAmount: 0.01
    },
    HAY: {
        decmials: 18,
        address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
        dustAmount: 0.01
    },
    SnBNB: {
        decmials: 18,
        address: '0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B',
        dustAmount: 0.001
    },

}
// goes both ways
const watchedPairs = {
    'WETH': [
        {
            quote: 'wstETH',
            pivots: undefined,
            exportToInternalDashboard: true
        },
    ]
};

module.exports = { tokens, watchedPairs };