/* eslint-disable */

const HighCovRatioFeePoolV2Abi = [
  { inputs: [], name: 'CORE_UNDERFLOW', type: 'error' },
  { inputs: [], name: 'WOMBAT_AMOUNT_TOO_LOW', type: 'error' },
  { inputs: [], name: 'WOMBAT_ASSET_ALREADY_EXIST', type: 'error' },
  { inputs: [], name: 'WOMBAT_ASSET_ALREADY_PAUSED', type: 'error' },
  { inputs: [], name: 'WOMBAT_ASSET_NOT_EXISTS', type: 'error' },
  { inputs: [], name: 'WOMBAT_ASSET_NOT_PAUSED', type: 'error' },
  { inputs: [], name: 'WOMBAT_CASH_NOT_ENOUGH', type: 'error' },
  { inputs: [], name: 'WOMBAT_COV_RATIO_LIMIT_EXCEEDED', type: 'error' },
  { inputs: [], name: 'WOMBAT_EXPIRED', type: 'error' },
  { inputs: [], name: 'WOMBAT_FORBIDDEN', type: 'error' },
  { inputs: [], name: 'WOMBAT_INVALID_VALUE', type: 'error' },
  { inputs: [], name: 'WOMBAT_SAME_ADDRESS', type: 'error' },
  { inputs: [], name: 'WOMBAT_ZERO_ADDRESS', type: 'error' },
  { inputs: [], name: 'WOMBAT_ZERO_AMOUNT', type: 'error' },
  { inputs: [], name: 'WOMBAT_ZERO_LIQUIDITY', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'token', type: 'address' },
      { indexed: true, internalType: 'address', name: 'asset', type: 'address' }
    ],
    name: 'AssetAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'token', type: 'address' },
      { indexed: true, internalType: 'address', name: 'asset', type: 'address' }
    ],
    name: 'AssetRemoved',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'Deposit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'FillPool',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }],
    name: 'Initialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
    name: 'Paused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'PausedAsset',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'SetAmpFactor',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'addr', type: 'address' }],
    name: 'SetDev',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'lpDividendRatio', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'retentionRatio', type: 'uint256' }
    ],
    name: 'SetFee',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'addr', type: 'address' }],
    name: 'SetFeeTo',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'SetHaircutRate',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'addr', type: 'address' }],
    name: 'SetMasterWombat',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'SetMintFeeThreshold',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: false, internalType: 'address', name: 'fromToken', type: 'address' },
      { indexed: false, internalType: 'address', name: 'toToken', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'toAmount', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'Swap',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'TransferTipBucket',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
    name: 'Unpaused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'UnpausedAsset',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'Withdraw',
    type: 'event'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'asset', type: 'address' }
    ],
    name: 'addAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'addressOfAsset',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ampFactor',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'minimumLiquidity', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'bool', name: 'shouldStake', type: 'bool' }
    ],
    name: 'deposit',
    outputs: [{ internalType: 'uint256', name: 'liquidity', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'dev',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'endCovRatio',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'exchangeRate',
    outputs: [{ internalType: 'uint256', name: 'xr', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeTo',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'fillPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTokens',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'globalEquilCovRatio',
    outputs: [
      { internalType: 'uint256', name: 'equilCovRatio', type: 'uint256' },
      { internalType: 'uint256', name: 'invariantInUint', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'haircutRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'ampFactor_', type: 'uint256' },
      { internalType: 'uint256', name: 'haircutRate_', type: 'uint256' }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'isPaused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lpDividendRatio',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'masterWombat',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'mintFee',
    outputs: [{ internalType: 'uint256', name: 'feeCollected', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mintFeeThreshold',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'pauseAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'fromToken', type: 'address' },
      { internalType: 'address', name: 'toToken', type: 'address' },
      { internalType: 'int256', name: 'toAmount', type: 'int256' }
    ],
    name: 'quoteAmountIn',
    outputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'haircut', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'quotePotentialDeposit',
    outputs: [
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      { internalType: 'uint256', name: 'reward', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'fromToken', type: 'address' },
      { internalType: 'address', name: 'toToken', type: 'address' },
      { internalType: 'int256', name: 'fromAmount', type: 'int256' }
    ],
    name: 'quotePotentialSwap',
    outputs: [
      { internalType: 'uint256', name: 'potentialOutcome', type: 'uint256' },
      { internalType: 'uint256', name: 'haircut', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' }
    ],
    name: 'quotePotentialWithdraw',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'fee', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'fromToken', type: 'address' },
      { internalType: 'address', name: 'toToken', type: 'address' },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' }
    ],
    name: 'quotePotentialWithdrawFromOtherAsset',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'withdrewAmount', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'removeAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'retentionRatio',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'ampFactor_', type: 'uint256' }],
    name: 'setAmpFactor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint128', name: 'startCovRatio_', type: 'uint128' },
      { internalType: 'uint128', name: 'endCovRatio_', type: 'uint128' }
    ],
    name: 'setCovRatioFeeParam',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'dev_', type: 'address' }],
    name: 'setDev',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'lpDividendRatio_', type: 'uint256' },
      { internalType: 'uint256', name: 'retentionRatio_', type: 'uint256' }
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'feeTo_', type: 'address' }],
    name: 'setFeeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'haircutRate_', type: 'uint256' }],
    name: 'setHaircutRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'masterWombat_', type: 'address' }],
    name: 'setMasterWombat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'mintFeeThreshold_', type: 'uint256' }],
    name: 'setMintFeeThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'startCovRatio',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'fromToken', type: 'address' },
      { internalType: 'address', name: 'toToken', type: 'address' },
      { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'minimumToAmount', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' }
    ],
    name: 'swap',
    outputs: [
      { internalType: 'uint256', name: 'actualToAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'haircut', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'tipBucketBalance',
    outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'transferTipBucket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'unpauseAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      { internalType: 'uint256', name: 'minimumAmount', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' }
    ],
    name: 'withdraw',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'fromToken', type: 'address' },
      { internalType: 'address', name: 'toToken', type: 'address' },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      { internalType: 'uint256', name: 'minimumAmount', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' }
    ],
    name: 'withdrawFromOtherAsset',
    outputs: [{ internalType: 'uint256', name: 'toAmount', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
const wombatPoolAssetAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'underlyingToken_', type: 'address' },
      { internalType: 'string', name: 'name_', type: 'string' },
      { internalType: 'string', name: 'symbol_', type: 'string' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { inputs: [], name: 'ASSET_OVERFLOW', type: 'error' },
  { inputs: [], name: 'WOMBAT_FORBIDDEN', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'previousMaxSupply', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'newMaxSupply', type: 'uint256' }
    ],
    name: 'SetMaxSupply',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'previousPoolAddr', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newPoolAddr', type: 'address' }
    ],
    name: 'SetPool',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'addCash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'addLiability',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cash',
    outputs: [{ internalType: 'uint120', name: '', type: 'uint120' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' }
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'liability',
    outputs: [{ internalType: 'uint120', name: '', type: 'uint120' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pool',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'removeCash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'removeLiability',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'uint256', name: 'maxSupply_', type: 'uint256' }],
    name: 'setMaxSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'pool_', type: 'address' }],
    name: 'setPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transferUnderlyingToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'underlyingToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'underlyingTokenBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'underlyingTokenDecimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const wombatPools = [
  {
    poolName: 'MainPool',
    poolAddress: '0x312Bc7eAAF93f1C60Dc5AfC115FcCDE161055fb0',
    poolAbi: HighCovRatioFeePoolV2Abi,
    tokens: [
      {
        symbol: 'DAI'
      },
      {
        symbol: 'USDC'
      },
      {
        symbol: 'USDT'
      }
    ]
  },
  {
    poolName: 'SmartlisUSDPool',
    poolAddress: '0x0520451B19AD0bb00eD35ef391086A692CFC74B2',
    poolAbi: HighCovRatioFeePoolV2Abi,
    tokens: [
      {
        symbol: 'lisUSD'
      },
      {
        symbol: 'USDC'
      },
      {
        symbol: 'USDT'
      }
    ]
  }
];

const wombatPricePairs = [
  {
    poolAddress: '0x312Bc7eAAF93f1C60Dc5AfC115FcCDE161055fb0',
    poolName: 'MainPool',
    abi: HighCovRatioFeePoolV2Abi,
    tokens: [
      {
        symbol: 'DAI',
        address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        decimals: 18
      },
      {
        symbol: 'USDC',
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        decimals: 18
      },
      {
        symbol: 'USDT',
        address: '0x55d398326f99059fF775485246999027B3197955',
        decimals: 18
      }
    ],
    pairs: [
      {
        token0: 'DAI',
        token1: 'USDC'
      },
      {
        token0: 'DAI',
        token1: 'USDT'
      },
      {
        token0: 'USDC',
        token1: 'USDT'
      }
    ]
  },
  {
    poolAddress: '0x0520451B19AD0bb00eD35ef391086A692CFC74B2',
    poolName: 'SmartlisUSDPool',
    abi: HighCovRatioFeePoolV2Abi,
    tokens: [
      {
        symbol: 'lisUSD',
        address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
        decimals: 18
      },
      {
        symbol: 'USDC',
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        decimals: 18
      },
      {
        symbol: 'USDT',
        address: '0x55d398326f99059fF775485246999027B3197955',
        decimals: 18
      }
    ],
    pairs: [
      {
        token0: 'lisUSD',
        token1: 'USDC'
      },
      {
        token0: 'lisUSD',
        token1: 'USDT'
      }
    ]
  }
];

module.exports = { HighCovRatioFeePoolV2Abi, wombatPoolAssetAbi, wombatPools, wombatPricePairs };
