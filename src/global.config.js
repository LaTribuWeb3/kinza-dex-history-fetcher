const tokens = {
  BNB: {
    decimals: 18,
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    dustAmount: 0.001
  },
  WBNB: {
    decimals: 18,
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    dustAmount: 0.001
  },
  BTCB: {
    decimals: 18,
    address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    dustAmount: 0.000001
  },
  DAI: {
    decimals: 18,
    address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    dustAmount: 0.01
  },
  USDC: {
    decimals: 18,
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    dustAmount: 0.01
  },
  ETH: {
    decimals: 18,
    address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    dustAmount: 0.00001
  },
  USDT: {
    decimals: 18,
    address: '0x55d398326f99059fF775485246999027B3197955',
    dustAmount: 0.01
  },
  FDUSD: {
    decimals: 18,
    address: '0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409',
    dustAmount: 0.01
  },
  wBETH: {
    decimals: 18,
    address: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
    dustAmount: 0.01
  },
  lisUSD: {
    decimals: 18,
    address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
    dustAmount: 0.01
  },
  SnBNB: {
    decimals: 18,
    address: '0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B',
    dustAmount: 0.001
  },
  slisBNB: {
    decimals: 18,
    address: '0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B',
    dustAmount: 0.001
  },
  ezETH: {
    decimals: 18,
    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
    dustAmount: 0.00001
  },
  xPufETH: {
    decimals: 18,
    address: '0x64274835D88F5c0215da8AADd9A5f2D2A2569381',
    dustAmount: 0.00001
  },
  SolvBTC: {
    decimals: 18,
    address: '0x4aae823a6a0b376De6A78e74eCC5b079d38cBCf7',
    dustAmount: 0.000001
  },
  Cake: {
    decimals: 18,
    address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    dustAmount: 0.001
  },
  SolvBTCBBN: {
    decimals: 18,
    address: '0x1346b618dC92810EC74163e4c27004c921D446a5',
    dustAmount: 0.000001
  }
};
// goes both ways
const watchedPairs = {
  WBNB: [
    {
      quote: 'BTCB',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'USDC',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'ETH',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'USDT',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'FDUSD',
      pivots: ['USDT'],
      exportToInternalDashboard: true
    },
    {
      quote: 'wBETH',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'lisUSD',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'SnBNB',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'slisBNB',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'Cake',
      pivots: undefined,
      exportToInternalDashboard: true
    }
  ],
  BTCB: [
    {
      quote: 'USDC',
      pivots: ['USDT'],
      exportToInternalDashboard: true
    },
    {
      quote: 'ETH',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'USDT',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'FDUSD',
      pivots: ['USDT'],
      exportToInternalDashboard: true
    },
    {
      quote: 'wBETH',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'lisUSD',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'SnBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'slisBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'SolvBTC',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'Cake',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'SolvBTCBBN',
      pivots: ['SolvBTC'],
      exportToInternalDashboard: true
    },
  ],
  USDC: [
    {
      quote: 'ETH',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'USDT',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'FDUSD',
      pivots: ['USDT'],
      exportToInternalDashboard: true
    },
    {
      quote: 'wBETH',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'lisUSD',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'SnBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'slisBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'ezETH',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'Cake',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'SolvBTC',
      pivots: ['BTCB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'xPufETH',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'SolvBTCBBN',
      pivots: ['BTCB', 'SolvBTC'],
      exportToInternalDashboard: true
    }
  ],
  ETH: [
    {
      quote: 'USDT',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'FDUSD',
      pivots: ['USDT'],
      exportToInternalDashboard: true
    },
    {
      quote: 'wBETH',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'lisUSD',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'SnBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'slisBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'ezETH',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'xPufETH',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'Cake',
      pivots: undefined,
      exportToInternalDashboard: true
    }
  ],
  USDT: [
    {
      quote: 'FDUSD',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'wBETH',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'lisUSD',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'SnBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'slisBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'Cake',
      pivots: undefined,
      exportToInternalDashboard: true
    },
    {
      quote: 'SolvBTCBBN',
      pivots: ['SolvBTC', 'BTCB'],
      exportToInternalDashboard: true
    }
  ],
  FDUSD: [
    {
      quote: 'wBETH',
      pivots: ['USDT', 'ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'lisUSD',
      pivots: ['USDT'],
      exportToInternalDashboard: true
    },
    {
      quote: 'SnBNB',
      pivots: ['USDT', 'WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'slisBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'Cake',
      pivots: undefined,
      exportToInternalDashboard: true
    }
  ],
  wBETH: [
    {
      quote: 'lisUSD',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'SnBNB',
      pivots: ['ETH', 'WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'slisBNB',
      pivots: ['ETH', 'WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'Cake',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    },
    {
      quote: 'xPufETH',
      pivots: ['ETH'],
      exportToInternalDashboard: true
    }
  ],
  lisUSD: [
    {
      quote: 'SnBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'slisBNB',
      pivots: ['WBNB'],
      exportToInternalDashboard: true
    },
    {
      quote: 'Cake',
      pivots: undefined,
      exportToInternalDashboard: true
    }
  ],
  SolvBTC: [
    {
      quote: 'SolvBTCBBN',
      pivots: undefined,
      exportToInternalDashboard: true
    }
  ]
};

const pairsToFetch = ['WBNB', 'USDT', 'ETH', 'BTCB', 'USDC', 'FDUSD', 'SnBNB', 'wBETH', 'lisUSD', 'slisBNB', 'ezETH', 'xPufETH', 'SolvBTC', 'Cake', 'SolvBTCBBN'];

const newAssetsForMinVolatility = ['ezETH'];

function GetPairToUse(from, to) {
  let actualFrom = from;
  let actualTo = to;

  if (from == 'sDAI') {
    actualFrom = 'DAI';
  }
  if (to == 'sDAI') {
    actualTo = 'DAI';
  }

  return { actualFrom, actualTo };
}

const specificPivotsOverride = {
  'SolvBTCBBN/SolvBTC': [],
  'SolvBTCBBN/*': ['SolvBTC', 'BTCB', 'USDT'],
  'SolvBTC/SolvBTCBBN': [],
  '*/SolvBTCBBN': ['USDT', 'BTCB', 'SolvBTC']
};

module.exports = {
  tokens,
  watchedPairs,
  pairsToFetch,
  newAssetsForMinVolatility,
  GetPairToUse,
  specificPivotsOverride
};
