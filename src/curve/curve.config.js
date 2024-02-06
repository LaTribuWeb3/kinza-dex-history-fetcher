/* eslint-disable */
const curveFactoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

const curvePoolAbi = [
  {
    name: 'TokenExchange',
    inputs: [
      { type: 'address', name: 'buyer', indexed: true },
      { type: 'int128', name: 'sold_id', indexed: false },
      { type: 'uint256', name: 'tokens_sold', indexed: false },
      { type: 'int128', name: 'bought_id', indexed: false },
      { type: 'uint256', name: 'tokens_bought', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[3]', name: 'token_amounts', indexed: false },
      { type: 'uint256[3]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'invariant', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[3]', name: 'token_amounts', indexed: false },
      { type: 'uint256[3]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityOne',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256', name: 'token_amount', indexed: false },
      { type: 'uint256', name: 'coin_amount', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[3]', name: 'token_amounts', indexed: false },
      { type: 'uint256[3]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'invariant', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewAdmin',
    inputs: [
      { type: 'uint256', name: 'deadline', indexed: true },
      { type: 'address', name: 'admin', indexed: true }
    ],
    anonymous: false,
    type: 'event'
  },
  { name: 'NewAdmin', inputs: [{ type: 'address', name: 'admin', indexed: true }], anonymous: false, type: 'event' },
  {
    name: 'CommitNewFee',
    inputs: [
      { type: 'uint256', name: 'deadline', indexed: true },
      { type: 'uint256', name: 'fee', indexed: false },
      { type: 'uint256', name: 'admin_fee', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'NewFee',
    inputs: [
      { type: 'uint256', name: 'fee', indexed: false },
      { type: 'uint256', name: 'admin_fee', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RampA',
    inputs: [
      { type: 'uint256', name: 'old_A', indexed: false },
      { type: 'uint256', name: 'new_A', indexed: false },
      { type: 'uint256', name: 'initial_time', indexed: false },
      { type: 'uint256', name: 'future_time', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'StopRampA',
    inputs: [
      { type: 'uint256', name: 'A', indexed: false },
      { type: 'uint256', name: 't', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { type: 'address', name: '_owner' },
      { type: 'address[3]', name: '_coins' },
      { type: 'address', name: '_pool_token' },
      { type: 'uint256', name: '_A' },
      { type: 'uint256', name: '_fee' },
      { type: 'uint256', name: '_admin_fee' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { name: 'A', outputs: [{ type: 'uint256', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  {
    name: 'get_virtual_price',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'calc_token_amount',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'uint256[3]', name: 'amounts' },
      { type: 'bool', name: 'deposit' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'add_liquidity',
    outputs: [],
    inputs: [
      { type: 'uint256[3]', name: 'amounts' },
      { type: 'uint256', name: 'min_mint_amount' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    name: 'get_dy',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'get_dy_underlying',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'exchange',
    outputs: [],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' },
      { type: 'uint256', name: 'min_dy' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    name: 'remove_liquidity',
    outputs: [],
    inputs: [
      { type: 'uint256', name: '_amount' },
      { type: 'uint256[3]', name: 'min_amounts' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    name: 'remove_liquidity_imbalance',
    outputs: [],
    inputs: [
      { type: 'uint256[3]', name: 'amounts' },
      { type: 'uint256', name: 'max_burn_amount' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    name: 'calc_withdraw_one_coin',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'uint256', name: '_token_amount' },
      { type: 'int128', name: 'i' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'remove_liquidity_one_coin',
    outputs: [],
    inputs: [
      { type: 'uint256', name: '_token_amount' },
      { type: 'int128', name: 'i' },
      { type: 'uint256', name: 'min_amount' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    name: 'ramp_A',
    outputs: [],
    inputs: [
      { type: 'uint256', name: '_future_A' },
      { type: 'uint256', name: '_future_time' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { name: 'stop_ramp_A', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    name: 'commit_new_fee',
    outputs: [],
    inputs: [
      { type: 'uint256', name: 'new_fee' },
      { type: 'uint256', name: 'new_admin_fee' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { name: 'apply_new_fee', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'revert_new_parameters', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    name: 'commit_transfer_ownership',
    outputs: [],
    inputs: [{ type: 'address', name: '_owner' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { name: 'apply_transfer_ownership', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'revert_transfer_ownership', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    name: 'admin_balances',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [{ type: 'uint256', name: 'i' }],
    stateMutability: 'view',
    type: 'function'
  },
  { name: 'withdraw_admin_fees', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'donate_admin_fees', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'kill_me', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'unkill_me', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    name: 'coins',
    outputs: [{ type: 'address', name: '' }],
    inputs: [{ type: 'uint256', name: 'arg0' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'balances',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [{ type: 'uint256', name: 'arg0' }],
    stateMutability: 'view',
    type: 'function'
  },
  { name: 'fee', outputs: [{ type: 'uint256', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  {
    name: 'admin_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  { name: 'owner', outputs: [{ type: 'address', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  {
    name: 'initial_A',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  { name: 'future_A', outputs: [{ type: 'uint256', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  {
    name: 'initial_A_time',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'future_A_time',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'admin_actions_deadline',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'transfer_ownership_deadline',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'future_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'future_admin_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'future_owner',
    outputs: [{ type: 'address', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  }
];
const erc20Abi = [
  {
    inputs: [{ internalType: 'uint256', name: 'chainId_', type: 'uint256' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'src', type: 'address' },
      { indexed: true, internalType: 'address', name: 'guy', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: true,
    inputs: [
      { indexed: true, internalType: 'bytes4', name: 'sig', type: 'bytes4' },
      { indexed: true, internalType: 'address', name: 'usr', type: 'address' },
      { indexed: true, internalType: 'bytes32', name: 'arg1', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'arg2', type: 'bytes32' },
      { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' }
    ],
    name: 'LogNote',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'src', type: 'address' },
      { indexed: true, internalType: 'address', name: 'dst', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    constant: true,
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'guy', type: 'address' }],
    name: 'deny',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'src', type: 'address' },
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'holder', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'uint256', name: 'expiry', type: 'uint256' },
      { internalType: 'bool', name: 'allowed', type: 'bool' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'pull',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'push',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'guy', type: 'address' }],
    name: 'rely',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'src', type: 'address' },
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'wards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];
const newParamAbi = [
  {
    name: 'TokenExchange',
    inputs: [
      { type: 'address', name: 'buyer', indexed: true },
      { type: 'int128', name: 'sold_id', indexed: false },
      { type: 'uint256', name: 'tokens_sold', indexed: false },
      { type: 'int128', name: 'bought_id', indexed: false },
      { type: 'uint256', name: 'tokens_bought', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'TokenExchangeUnderlying',
    inputs: [
      { type: 'address', name: 'buyer', indexed: true },
      { type: 'int128', name: 'sold_id', indexed: false },
      { type: 'uint256', name: 'tokens_sold', indexed: false },
      { type: 'int128', name: 'bought_id', indexed: false },
      { type: 'uint256', name: 'tokens_bought', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[4]', name: 'token_amounts', indexed: false },
      { type: 'uint256[4]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'invariant', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[4]', name: 'token_amounts', indexed: false },
      { type: 'uint256[4]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[4]', name: 'token_amounts', indexed: false },
      { type: 'uint256[4]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'invariant', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewAdmin',
    inputs: [
      { type: 'uint256', name: 'deadline', indexed: true, unit: 'sec' },
      { type: 'address', name: 'admin', indexed: true }
    ],
    anonymous: false,
    type: 'event'
  },
  { name: 'NewAdmin', inputs: [{ type: 'address', name: 'admin', indexed: true }], anonymous: false, type: 'event' },
  {
    name: 'CommitNewParameters',
    inputs: [
      { type: 'uint256', name: 'deadline', indexed: true, unit: 'sec' },
      { type: 'uint256', name: 'A', indexed: false },
      { type: 'uint256', name: 'fee', indexed: false },
      { type: 'uint256', name: 'admin_fee', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'NewParameters',
    inputs: [
      { type: 'uint256', name: 'A', indexed: false },
      { type: 'uint256', name: 'fee', indexed: false },
      { type: 'uint256', name: 'admin_fee', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { type: 'address[4]', name: '_coins' },
      { type: 'address[4]', name: '_underlying_coins' },
      { type: 'address', name: '_pool_token' },
      { type: 'uint256', name: '_A' },
      { type: 'uint256', name: '_fee' }
    ],
    constant: false,
    payable: false,
    type: 'constructor'
  },
  {
    name: 'get_virtual_price',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'calc_token_amount',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [
      { type: 'uint256[4]', name: 'amounts' },
      { type: 'bool', name: 'deposit' }
    ],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'add_liquidity',
    outputs: [],
    inputs: [
      { type: 'uint256[4]', name: 'amounts' },
      { type: 'uint256', name: 'min_mint_amount' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'get_dy',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' }
    ],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'get_dx',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dy' }
    ],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'get_dy_underlying',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' }
    ],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'get_dx_underlying',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dy' }
    ],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'exchange',
    outputs: [],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' },
      { type: 'uint256', name: 'min_dy' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'exchange_underlying',
    outputs: [],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' },
      { type: 'uint256', name: 'min_dy' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'remove_liquidity',
    outputs: [],
    inputs: [
      { type: 'uint256', name: '_amount' },
      { type: 'uint256[4]', name: 'min_amounts' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'remove_liquidity_imbalance',
    outputs: [],
    inputs: [
      { type: 'uint256[4]', name: 'amounts' },
      { type: 'uint256', name: 'max_burn_amount' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'commit_new_parameters',
    outputs: [],
    inputs: [
      { type: 'uint256', name: 'amplification' },
      { type: 'uint256', name: 'new_fee' },
      { type: 'uint256', name: 'new_admin_fee' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  { name: 'apply_new_parameters', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'revert_new_parameters', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  {
    name: 'commit_transfer_ownership',
    outputs: [],
    inputs: [{ type: 'address', name: '_owner' }],
    constant: false,
    payable: false,
    type: 'function'
  },
  { name: 'apply_transfer_ownership', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'revert_transfer_ownership', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'withdraw_admin_fees', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'kill_me', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'unkill_me', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  {
    name: 'coins',
    outputs: [{ type: 'address', name: 'out' }],
    inputs: [{ type: 'int128', name: 'arg0' }],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'underlying_coins',
    outputs: [{ type: 'address', name: 'out' }],
    inputs: [{ type: 'int128', name: 'arg0' }],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'balances',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [{ type: 'int128', name: 'arg0' }],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'A',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'fee',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'admin_fee',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'owner',
    outputs: [{ type: 'address', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'admin_actions_deadline',
    outputs: [{ type: 'uint256', unit: 'sec', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'transfer_ownership_deadline',
    outputs: [{ type: 'uint256', unit: 'sec', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'future_A',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'future_fee',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'future_admin_fee',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'future_owner',
    outputs: [{ type: 'address', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  }
];
const rampAGammaAbi = [
  {
    name: 'TokenExchange',
    inputs: [
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'sold_id', type: 'uint256', indexed: false },
      { name: 'tokens_sold', type: 'uint256', indexed: false },
      { name: 'bought_id', type: 'uint256', indexed: false },
      { name: 'tokens_bought', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[2]', indexed: false },
      { name: 'fee', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[2]', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityOne',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amount', type: 'uint256', indexed: false },
      { name: 'coin_index', type: 'uint256', indexed: false },
      { name: 'coin_amount', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewParameters',
    inputs: [
      { name: 'deadline', type: 'uint256', indexed: true },
      { name: 'admin_fee', type: 'uint256', indexed: false },
      { name: 'mid_fee', type: 'uint256', indexed: false },
      { name: 'out_fee', type: 'uint256', indexed: false },
      { name: 'fee_gamma', type: 'uint256', indexed: false },
      { name: 'allowed_extra_profit', type: 'uint256', indexed: false },
      { name: 'adjustment_step', type: 'uint256', indexed: false },
      { name: 'ma_half_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'NewParameters',
    inputs: [
      { name: 'admin_fee', type: 'uint256', indexed: false },
      { name: 'mid_fee', type: 'uint256', indexed: false },
      { name: 'out_fee', type: 'uint256', indexed: false },
      { name: 'fee_gamma', type: 'uint256', indexed: false },
      { name: 'allowed_extra_profit', type: 'uint256', indexed: false },
      { name: 'adjustment_step', type: 'uint256', indexed: false },
      { name: 'ma_half_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RampAgamma',
    inputs: [
      { name: 'initial_A', type: 'uint256', indexed: false },
      { name: 'future_A', type: 'uint256', indexed: false },
      { name: 'initial_gamma', type: 'uint256', indexed: false },
      { name: 'future_gamma', type: 'uint256', indexed: false },
      { name: 'initial_time', type: 'uint256', indexed: false },
      { name: 'future_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'StopRampA',
    inputs: [
      { name: 'current_A', type: 'uint256', indexed: false },
      { name: 'current_gamma', type: 'uint256', indexed: false },
      { name: 'time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'ClaimAdminFee',
    inputs: [
      { name: 'admin', type: 'address', indexed: true },
      { name: 'tokens', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [{ name: '_weth', type: 'address' }], outputs: [] },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange_underlying',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange_underlying',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange_extended',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'cb', type: 'bytes32' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[2]' },
      { name: 'min_mint_amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[2]' },
      { name: 'min_mint_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[2]' },
      { name: 'min_mint_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[2]' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[2]' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[2]' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'claim_admin_fees', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'ramp_A_gamma',
    inputs: [
      { name: 'future_A', type: 'uint256' },
      { name: 'future_gamma', type: 'uint256' },
      { name: 'future_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'stop_ramp_A_gamma', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'commit_new_parameters',
    inputs: [
      { name: '_new_mid_fee', type: 'uint256' },
      { name: '_new_out_fee', type: 'uint256' },
      { name: '_new_admin_fee', type: 'uint256' },
      { name: '_new_fee_gamma', type: 'uint256' },
      { name: '_new_allowed_extra_profit', type: 'uint256' },
      { name: '_new_adjustment_step', type: 'uint256' },
      { name: '_new_ma_half_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'apply_new_parameters', inputs: [], outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', name: 'revert_new_parameters', inputs: [], outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_dy',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_token_amount',
    inputs: [{ name: 'amounts', type: 'uint256[2]' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_withdraw_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'lp_price', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'A', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'gamma', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_oracle',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: 'A', type: 'uint256' },
      { name: 'gamma', type: 'uint256' },
      { name: 'mid_fee', type: 'uint256' },
      { name: 'out_fee', type: 'uint256' },
      { name: 'allowed_extra_profit', type: 'uint256' },
      { name: 'fee_gamma', type: 'uint256' },
      { name: 'adjustment_step', type: 'uint256' },
      { name: 'admin_fee', type: 'uint256' },
      { name: 'ma_half_time', type: 'uint256' },
      { name: 'initial_price', type: 'uint256' },
      { name: '_token', type: 'address' },
      { name: '_coins', type: 'address[2]' },
      { name: '_precisions', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'view', type: 'function', name: 'token', inputs: [], outputs: [{ name: '', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'coins',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_scale',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_prices',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_prices_timestamp',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_gamma_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_gamma_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'allowed_extra_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_allowed_extra_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'fee_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_fee_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'adjustment_step',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_adjustment_step',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'ma_half_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_ma_half_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'mid_fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'out_fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_mid_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_out_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_admin_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'balances',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'D', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'factory', inputs: [], outputs: [{ name: '', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'xcp_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'xcp_profit_a',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_actions_deadline',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  }
];
const susdCurvePoolAbi = [
  {
    name: 'TokenExchange',
    inputs: [
      { type: 'address', name: 'buyer', indexed: true },
      { type: 'int128', name: 'sold_id', indexed: false },
      { type: 'uint256', name: 'tokens_sold', indexed: false },
      { type: 'int128', name: 'bought_id', indexed: false },
      { type: 'uint256', name: 'tokens_bought', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'TokenExchangeUnderlying',
    inputs: [
      { type: 'address', name: 'buyer', indexed: true },
      { type: 'int128', name: 'sold_id', indexed: false },
      { type: 'uint256', name: 'tokens_sold', indexed: false },
      { type: 'int128', name: 'bought_id', indexed: false },
      { type: 'uint256', name: 'tokens_bought', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[4]', name: 'token_amounts', indexed: false },
      { type: 'uint256[4]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'invariant', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[4]', name: 'token_amounts', indexed: false },
      { type: 'uint256[4]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[4]', name: 'token_amounts', indexed: false },
      { type: 'uint256[4]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'invariant', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewAdmin',
    inputs: [
      { type: 'uint256', name: 'deadline', indexed: true, unit: 'sec' },
      { type: 'address', name: 'admin', indexed: true }
    ],
    anonymous: false,
    type: 'event'
  },
  { name: 'NewAdmin', inputs: [{ type: 'address', name: 'admin', indexed: true }], anonymous: false, type: 'event' },
  {
    name: 'CommitNewParameters',
    inputs: [
      { type: 'uint256', name: 'deadline', indexed: true, unit: 'sec' },
      { type: 'uint256', name: 'A', indexed: false },
      { type: 'uint256', name: 'fee', indexed: false },
      { type: 'uint256', name: 'admin_fee', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'NewParameters',
    inputs: [
      { type: 'uint256', name: 'A', indexed: false },
      { type: 'uint256', name: 'fee', indexed: false },
      { type: 'uint256', name: 'admin_fee', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { type: 'address[4]', name: '_coins' },
      { type: 'address[4]', name: '_underlying_coins' },
      { type: 'address', name: '_pool_token' },
      { type: 'uint256', name: '_A' },
      { type: 'uint256', name: '_fee' }
    ],
    constant: false,
    payable: false,
    type: 'constructor'
  },
  {
    name: 'get_virtual_price',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'calc_token_amount',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'uint256[4]', name: 'amounts' },
      { type: 'bool', name: 'deposit' }
    ],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'add_liquidity',
    outputs: [],
    inputs: [
      { type: 'uint256[4]', name: 'amounts' },
      { type: 'uint256', name: 'min_mint_amount' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'get_dy',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' }
    ],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'get_dy_underlying',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' }
    ],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'exchange',
    outputs: [],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' },
      { type: 'uint256', name: 'min_dy' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'exchange_underlying',
    outputs: [],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' },
      { type: 'uint256', name: 'min_dy' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'remove_liquidity',
    outputs: [],
    inputs: [
      { type: 'uint256', name: '_amount' },
      { type: 'uint256[4]', name: 'min_amounts' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'remove_liquidity_imbalance',
    outputs: [],
    inputs: [
      { type: 'uint256[4]', name: 'amounts' },
      { type: 'uint256', name: 'max_burn_amount' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'commit_new_parameters',
    outputs: [],
    inputs: [
      { type: 'uint256', name: 'amplification' },
      { type: 'uint256', name: 'new_fee' },
      { type: 'uint256', name: 'new_admin_fee' }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  { name: 'apply_new_parameters', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'revert_new_parameters', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  {
    name: 'commit_transfer_ownership',
    outputs: [],
    inputs: [{ type: 'address', name: '_owner' }],
    constant: false,
    payable: false,
    type: 'function'
  },
  { name: 'apply_transfer_ownership', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'revert_transfer_ownership', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'withdraw_admin_fees', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'kill_me', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  { name: 'unkill_me', outputs: [], inputs: [], constant: false, payable: false, type: 'function' },
  {
    name: 'coins',
    outputs: [{ type: 'address', name: '' }],
    inputs: [{ type: 'int128', name: 'arg0' }],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'underlying_coins',
    outputs: [{ type: 'address', name: '' }],
    inputs: [{ type: 'int128', name: 'arg0' }],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'balances',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [{ type: 'int128', name: 'arg0' }],
    constant: true,
    payable: false,
    type: 'function'
  },
  { name: 'A', outputs: [{ type: 'uint256', name: '' }], inputs: [], constant: true, payable: false, type: 'function' },
  {
    name: 'fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'admin_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'owner',
    outputs: [{ type: 'address', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'admin_actions_deadline',
    outputs: [{ type: 'uint256', unit: 'sec', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'transfer_ownership_deadline',
    outputs: [{ type: 'uint256', unit: 'sec', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'future_A',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'future_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'future_admin_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  },
  {
    name: 'future_owner',
    outputs: [{ type: 'address', name: '' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function'
  }
];
const stableSwapAbi = [
  {
    name: 'TokenExchange',
    inputs: [
      { type: 'address', name: 'buyer', indexed: true },
      { type: 'int128', name: 'sold_id', indexed: false },
      { type: 'uint256', name: 'tokens_sold', indexed: false },
      { type: 'int128', name: 'bought_id', indexed: false },
      { type: 'uint256', name: 'tokens_bought', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'TokenExchangeUnderlying',
    inputs: [
      { type: 'address', name: 'buyer', indexed: true },
      { type: 'int128', name: 'sold_id', indexed: false },
      { type: 'uint256', name: 'tokens_sold', indexed: false },
      { type: 'int128', name: 'bought_id', indexed: false },
      { type: 'uint256', name: 'tokens_bought', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[2]', name: 'token_amounts', indexed: false },
      { type: 'uint256[2]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'invariant', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[2]', name: 'token_amounts', indexed: false },
      { type: 'uint256[2]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityOne',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256', name: 'token_amount', indexed: false },
      { type: 'uint256', name: 'coin_amount', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      { type: 'address', name: 'provider', indexed: true },
      { type: 'uint256[2]', name: 'token_amounts', indexed: false },
      { type: 'uint256[2]', name: 'fees', indexed: false },
      { type: 'uint256', name: 'invariant', indexed: false },
      { type: 'uint256', name: 'token_supply', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewAdmin',
    inputs: [
      { type: 'uint256', name: 'deadline', indexed: true },
      { type: 'address', name: 'admin', indexed: true }
    ],
    anonymous: false,
    type: 'event'
  },
  { name: 'NewAdmin', inputs: [{ type: 'address', name: 'admin', indexed: true }], anonymous: false, type: 'event' },
  {
    name: 'CommitNewFee',
    inputs: [
      { type: 'uint256', name: 'deadline', indexed: true },
      { type: 'uint256', name: 'fee', indexed: false },
      { type: 'uint256', name: 'admin_fee', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'NewFee',
    inputs: [
      { type: 'uint256', name: 'fee', indexed: false },
      { type: 'uint256', name: 'admin_fee', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RampA',
    inputs: [
      { type: 'uint256', name: 'old_A', indexed: false },
      { type: 'uint256', name: 'new_A', indexed: false },
      { type: 'uint256', name: 'initial_time', indexed: false },
      { type: 'uint256', name: 'future_time', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'StopRampA',
    inputs: [
      { type: 'uint256', name: 'A', indexed: false },
      { type: 'uint256', name: 't', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { type: 'address', name: '_owner' },
      { type: 'address[2]', name: '_coins' },
      { type: 'address', name: '_pool_token' },
      { type: 'uint256', name: '_A' },
      { type: 'uint256', name: '_fee' },
      { type: 'uint256', name: '_admin_fee' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { name: 'A', outputs: [{ type: 'uint256', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  {
    name: 'A_precise',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'balances',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [{ type: 'uint256', name: 'i' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'get_virtual_price',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'calc_token_amount',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'uint256[2]', name: 'amounts' },
      { type: 'bool', name: 'is_deposit' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'add_liquidity',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'uint256[2]', name: 'amounts' },
      { type: 'uint256', name: 'min_mint_amount' }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    name: 'get_dy',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'exchange',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' },
      { type: 'uint256', name: 'min_dy' }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    name: 'remove_liquidity',
    outputs: [{ type: 'uint256[2]', name: '' }],
    inputs: [
      { type: 'uint256', name: '_amount' },
      { type: 'uint256[2]', name: '_min_amounts' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    name: 'remove_liquidity_imbalance',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'uint256[2]', name: '_amounts' },
      { type: 'uint256', name: '_max_burn_amount' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    name: 'calc_withdraw_one_coin',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'uint256', name: '_token_amount' },
      { type: 'int128', name: 'i' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'remove_liquidity_one_coin',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'uint256', name: '_token_amount' },
      { type: 'int128', name: 'i' },
      { type: 'uint256', name: '_min_amount' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    name: 'ramp_A',
    outputs: [],
    inputs: [
      { type: 'uint256', name: '_future_A' },
      { type: 'uint256', name: '_future_time' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { name: 'stop_ramp_A', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    name: 'commit_new_fee',
    outputs: [],
    inputs: [
      { type: 'uint256', name: 'new_fee' },
      { type: 'uint256', name: 'new_admin_fee' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { name: 'apply_new_fee', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'revert_new_parameters', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    name: 'commit_transfer_ownership',
    outputs: [],
    inputs: [{ type: 'address', name: '_owner' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { name: 'apply_transfer_ownership', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'revert_transfer_ownership', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'withdraw_admin_fees', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'donate_admin_fees', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'kill_me', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  { name: 'unkill_me', outputs: [], inputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    name: 'coins',
    outputs: [{ type: 'address', name: '' }],
    inputs: [{ type: 'uint256', name: 'arg0' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'admin_balances',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [{ type: 'uint256', name: 'arg0' }],
    stateMutability: 'view',
    type: 'function'
  },
  { name: 'fee', outputs: [{ type: 'uint256', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  {
    name: 'admin_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  { name: 'owner', outputs: [{ type: 'address', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  { name: 'lp_token', outputs: [{ type: 'address', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  {
    name: 'initial_A',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  { name: 'future_A', outputs: [{ type: 'uint256', name: '' }], inputs: [], stateMutability: 'view', type: 'function' },
  {
    name: 'initial_A_time',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'future_A_time',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'admin_actions_deadline',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'transfer_ownership_deadline',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'future_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'future_admin_fee',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    name: 'future_owner',
    outputs: [{ type: 'address', name: '' }],
    inputs: [],
    stateMutability: 'view',
    type: 'function'
  }
];
const triCryptov2Abi = [
  {
    name: 'TokenExchange',
    inputs: [
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'sold_id', type: 'uint256', indexed: false },
      { name: 'tokens_sold', type: 'uint256', indexed: false },
      { name: 'bought_id', type: 'uint256', indexed: false },
      { name: 'tokens_bought', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[3]', indexed: false },
      { name: 'fee', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[3]', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityOne',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amount', type: 'uint256', indexed: false },
      { name: 'coin_index', type: 'uint256', indexed: false },
      { name: 'coin_amount', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewAdmin',
    inputs: [
      { name: 'deadline', type: 'uint256', indexed: true },
      { name: 'admin', type: 'address', indexed: true }
    ],
    anonymous: false,
    type: 'event'
  },
  { name: 'NewAdmin', inputs: [{ name: 'admin', type: 'address', indexed: true }], anonymous: false, type: 'event' },
  {
    name: 'CommitNewParameters',
    inputs: [
      { name: 'deadline', type: 'uint256', indexed: true },
      { name: 'admin_fee', type: 'uint256', indexed: false },
      { name: 'mid_fee', type: 'uint256', indexed: false },
      { name: 'out_fee', type: 'uint256', indexed: false },
      { name: 'fee_gamma', type: 'uint256', indexed: false },
      { name: 'allowed_extra_profit', type: 'uint256', indexed: false },
      { name: 'adjustment_step', type: 'uint256', indexed: false },
      { name: 'ma_half_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'NewParameters',
    inputs: [
      { name: 'admin_fee', type: 'uint256', indexed: false },
      { name: 'mid_fee', type: 'uint256', indexed: false },
      { name: 'out_fee', type: 'uint256', indexed: false },
      { name: 'fee_gamma', type: 'uint256', indexed: false },
      { name: 'allowed_extra_profit', type: 'uint256', indexed: false },
      { name: 'adjustment_step', type: 'uint256', indexed: false },
      { name: 'ma_half_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RampAgamma',
    inputs: [
      { name: 'initial_A', type: 'uint256', indexed: false },
      { name: 'future_A', type: 'uint256', indexed: false },
      { name: 'initial_gamma', type: 'uint256', indexed: false },
      { name: 'future_gamma', type: 'uint256', indexed: false },
      { name: 'initial_time', type: 'uint256', indexed: false },
      { name: 'future_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'StopRampA',
    inputs: [
      { name: 'current_A', type: 'uint256', indexed: false },
      { name: 'current_gamma', type: 'uint256', indexed: false },
      { name: 'time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'ClaimAdminFee',
    inputs: [
      { name: 'admin', type: 'address', indexed: true },
      { name: 'tokens', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'admin_fee_receiver', type: 'address' },
      { name: 'A', type: 'uint256' },
      { name: 'gamma', type: 'uint256' },
      { name: 'mid_fee', type: 'uint256' },
      { name: 'out_fee', type: 'uint256' },
      { name: 'allowed_extra_profit', type: 'uint256' },
      { name: 'fee_gamma', type: 'uint256' },
      { name: 'adjustment_step', type: 'uint256' },
      { name: 'admin_fee', type: 'uint256' },
      { name: 'ma_half_time', type: 'uint256' },
      { name: 'initial_prices', type: 'uint256[2]' }
    ],
    outputs: []
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_oracle',
    inputs: [{ name: 'k', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_scale',
    inputs: [{ name: 'k', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_prices',
    inputs: [{ name: 'k', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'token', inputs: [], outputs: [{ name: '', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'coins',
    inputs: [{ name: 'i', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }]
  },
  { stateMutability: 'view', type: 'function', name: 'A', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'gamma', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'fee_calc',
    inputs: [{ name: 'xp', type: 'uint256[3]' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' }
    ],
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_dy',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_token_fee',
    inputs: [
      { name: 'amounts', type: 'uint256[3]' },
      { name: 'xp', type: 'uint256[3]' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[3]' },
      { name: 'min_mint_amount', type: 'uint256' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[3]' }
    ],
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_token_amount',
    inputs: [
      { name: 'amounts', type: 'uint256[3]' },
      { name: 'deposit', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_withdraw_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'claim_admin_fees', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'ramp_A_gamma',
    inputs: [
      { name: 'future_A', type: 'uint256' },
      { name: 'future_gamma', type: 'uint256' },
      { name: 'future_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'stop_ramp_A_gamma', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'commit_new_parameters',
    inputs: [
      { name: '_new_mid_fee', type: 'uint256' },
      { name: '_new_out_fee', type: 'uint256' },
      { name: '_new_admin_fee', type: 'uint256' },
      { name: '_new_fee_gamma', type: 'uint256' },
      { name: '_new_allowed_extra_profit', type: 'uint256' },
      { name: '_new_adjustment_step', type: 'uint256' },
      { name: '_new_ma_half_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'apply_new_parameters', inputs: [], outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', name: 'revert_new_parameters', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'commit_transfer_ownership',
    inputs: [{ name: '_owner', type: 'address' }],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'apply_transfer_ownership', inputs: [], outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', name: 'revert_transfer_ownership', inputs: [], outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', name: 'kill_me', inputs: [], outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', name: 'unkill_me', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'set_admin_fee_receiver',
    inputs: [{ name: '_admin_fee_receiver', type: 'address' }],
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_prices_timestamp',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_gamma_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_gamma_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'allowed_extra_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_allowed_extra_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'fee_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_fee_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'adjustment_step',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_adjustment_step',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'ma_half_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_ma_half_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'mid_fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'out_fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_mid_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_out_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_admin_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'balances',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'D', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'owner', inputs: [], outputs: [{ name: '', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_owner',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'xcp_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'xcp_profit_a',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'is_killed', inputs: [], outputs: [{ name: '', type: 'bool' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'kill_deadline',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'transfer_ownership_deadline',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_actions_deadline',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_fee_receiver',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  }
];
const cryptov2Abi = [
  {
    name: 'TokenExchange',
    inputs: [
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'sold_id', type: 'uint256', indexed: false },
      { name: 'tokens_sold', type: 'uint256', indexed: false },
      { name: 'bought_id', type: 'uint256', indexed: false },
      { name: 'tokens_bought', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[2]', indexed: false },
      { name: 'fee', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[2]', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityOne',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amount', type: 'uint256', indexed: false },
      { name: 'coin_index', type: 'uint256', indexed: false },
      { name: 'coin_amount', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewParameters',
    inputs: [
      { name: 'deadline', type: 'uint256', indexed: true },
      { name: 'admin_fee', type: 'uint256', indexed: false },
      { name: 'mid_fee', type: 'uint256', indexed: false },
      { name: 'out_fee', type: 'uint256', indexed: false },
      { name: 'fee_gamma', type: 'uint256', indexed: false },
      { name: 'allowed_extra_profit', type: 'uint256', indexed: false },
      { name: 'adjustment_step', type: 'uint256', indexed: false },
      { name: 'ma_half_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'NewParameters',
    inputs: [
      { name: 'admin_fee', type: 'uint256', indexed: false },
      { name: 'mid_fee', type: 'uint256', indexed: false },
      { name: 'out_fee', type: 'uint256', indexed: false },
      { name: 'fee_gamma', type: 'uint256', indexed: false },
      { name: 'allowed_extra_profit', type: 'uint256', indexed: false },
      { name: 'adjustment_step', type: 'uint256', indexed: false },
      { name: 'ma_half_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RampAgamma',
    inputs: [
      { name: 'initial_A', type: 'uint256', indexed: false },
      { name: 'future_A', type: 'uint256', indexed: false },
      { name: 'initial_gamma', type: 'uint256', indexed: false },
      { name: 'future_gamma', type: 'uint256', indexed: false },
      { name: 'initial_time', type: 'uint256', indexed: false },
      { name: 'future_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'StopRampA',
    inputs: [
      { name: 'current_A', type: 'uint256', indexed: false },
      { name: 'current_gamma', type: 'uint256', indexed: false },
      { name: 'time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'ClaimAdminFee',
    inputs: [
      { name: 'admin', type: 'address', indexed: true },
      { name: 'tokens', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [{ name: '_weth', type: 'address' }], outputs: [] },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange_underlying',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange_underlying',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange_extended',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'cb', type: 'bytes32' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[2]' },
      { name: 'min_mint_amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[2]' },
      { name: 'min_mint_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[2]' },
      { name: 'min_mint_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[2]' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[2]' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[2]' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'claim_admin_fees', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'ramp_A_gamma',
    inputs: [
      { name: 'future_A', type: 'uint256' },
      { name: 'future_gamma', type: 'uint256' },
      { name: 'future_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'stop_ramp_A_gamma', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'commit_new_parameters',
    inputs: [
      { name: '_new_mid_fee', type: 'uint256' },
      { name: '_new_out_fee', type: 'uint256' },
      { name: '_new_admin_fee', type: 'uint256' },
      { name: '_new_fee_gamma', type: 'uint256' },
      { name: '_new_allowed_extra_profit', type: 'uint256' },
      { name: '_new_adjustment_step', type: 'uint256' },
      { name: '_new_ma_half_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'apply_new_parameters', inputs: [], outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', name: 'revert_new_parameters', inputs: [], outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_dy',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_token_amount',
    inputs: [{ name: 'amounts', type: 'uint256[2]' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_withdraw_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'lp_price', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'A', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'gamma', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_oracle',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: 'A', type: 'uint256' },
      { name: 'gamma', type: 'uint256' },
      { name: 'mid_fee', type: 'uint256' },
      { name: 'out_fee', type: 'uint256' },
      { name: 'allowed_extra_profit', type: 'uint256' },
      { name: 'fee_gamma', type: 'uint256' },
      { name: 'adjustment_step', type: 'uint256' },
      { name: 'admin_fee', type: 'uint256' },
      { name: 'ma_half_time', type: 'uint256' },
      { name: 'initial_price', type: 'uint256' },
      { name: '_token', type: 'address' },
      { name: '_coins', type: 'address[2]' },
      { name: '_precisions', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'view', type: 'function', name: 'token', inputs: [], outputs: [{ name: '', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'coins',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_scale',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_prices',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_prices_timestamp',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_gamma_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_gamma_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'allowed_extra_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_allowed_extra_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'fee_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_fee_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'adjustment_step',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_adjustment_step',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'ma_half_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_ma_half_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'mid_fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'out_fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_mid_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_out_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_admin_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'balances',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'D', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'factory', inputs: [], outputs: [{ name: '', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'xcp_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'xcp_profit_a',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_actions_deadline',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  }
];
const tricryptoFactoryAbi = [
  {
    name: 'Transfer',
    inputs: [
      { name: 'sender', type: 'address', indexed: true },
      { name: 'receiver', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'Approval',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'TokenExchange',
    inputs: [
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'sold_id', type: 'uint256', indexed: false },
      { name: 'tokens_sold', type: 'uint256', indexed: false },
      { name: 'bought_id', type: 'uint256', indexed: false },
      { name: 'tokens_bought', type: 'uint256', indexed: false },
      { name: 'fee', type: 'uint256', indexed: false },
      { name: 'packed_price_scale', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[3]', indexed: false },
      { name: 'fee', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false },
      { name: 'packed_price_scale', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[3]', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityOne',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amount', type: 'uint256', indexed: false },
      { name: 'coin_index', type: 'uint256', indexed: false },
      { name: 'coin_amount', type: 'uint256', indexed: false },
      { name: 'approx_fee', type: 'uint256', indexed: false },
      { name: 'packed_price_scale', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewParameters',
    inputs: [
      { name: 'deadline', type: 'uint256', indexed: true },
      { name: 'mid_fee', type: 'uint256', indexed: false },
      { name: 'out_fee', type: 'uint256', indexed: false },
      { name: 'fee_gamma', type: 'uint256', indexed: false },
      { name: 'allowed_extra_profit', type: 'uint256', indexed: false },
      { name: 'adjustment_step', type: 'uint256', indexed: false },
      { name: 'ma_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'NewParameters',
    inputs: [
      { name: 'mid_fee', type: 'uint256', indexed: false },
      { name: 'out_fee', type: 'uint256', indexed: false },
      { name: 'fee_gamma', type: 'uint256', indexed: false },
      { name: 'allowed_extra_profit', type: 'uint256', indexed: false },
      { name: 'adjustment_step', type: 'uint256', indexed: false },
      { name: 'ma_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RampAgamma',
    inputs: [
      { name: 'initial_A', type: 'uint256', indexed: false },
      { name: 'future_A', type: 'uint256', indexed: false },
      { name: 'initial_gamma', type: 'uint256', indexed: false },
      { name: 'future_gamma', type: 'uint256', indexed: false },
      { name: 'initial_time', type: 'uint256', indexed: false },
      { name: 'future_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'StopRampA',
    inputs: [
      { name: 'current_A', type: 'uint256', indexed: false },
      { name: 'current_gamma', type: 'uint256', indexed: false },
      { name: 'time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'ClaimAdminFee',
    inputs: [
      { name: 'admin', type: 'address', indexed: true },
      { name: 'tokens', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_symbol', type: 'string' },
      { name: '_coins', type: 'address[3]' },
      { name: '_math', type: 'address' },
      { name: '_weth', type: 'address' },
      { name: '_salt', type: 'bytes32' },
      { name: 'packed_precisions', type: 'uint256' },
      { name: 'packed_A_gamma', type: 'uint256' },
      { name: 'packed_fee_params', type: 'uint256' },
      { name: 'packed_rebalancing_params', type: 'uint256' },
      { name: 'packed_prices', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange_underlying',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange_underlying',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'exchange_extended',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' },
      { name: 'min_dy', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'cb', type: 'bytes32' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[3]' },
      { name: 'min_mint_amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[3]' },
      { name: 'min_mint_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: 'amounts', type: 'uint256[3]' },
      { name: 'min_mint_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[3]' }
    ],
    outputs: [{ name: '', type: 'uint256[3]' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[3]' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256[3]' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[3]' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256[3]' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: 'min_amounts', type: 'uint256[3]' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' },
      { name: 'claim_admin_fees', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256[3]' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' },
      { name: 'min_amount', type: 'uint256' },
      { name: 'use_eth', type: 'bool' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'claim_admin_fees', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'approve',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'increaseAllowance',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_add_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'decreaseAllowance',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_sub_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'permit',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
      { name: '_deadline', type: 'uint256' },
      { name: '_v', type: 'uint8' },
      { name: '_r', type: 'bytes32' },
      { name: '_s', type: 'bytes32' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'fee_receiver',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_token_amount',
    inputs: [
      { name: 'amounts', type: 'uint256[3]' },
      { name: 'deposit', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_dy',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dx', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_dx',
    inputs: [
      { name: 'i', type: 'uint256' },
      { name: 'j', type: 'uint256' },
      { name: 'dy', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'lp_price', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_oracle',
    inputs: [{ name: 'k', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_prices',
    inputs: [{ name: 'k', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_scale',
    inputs: [{ name: 'k', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_withdraw_one_coin',
    inputs: [
      { name: 'token_amount', type: 'uint256' },
      { name: 'i', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_token_fee',
    inputs: [
      { name: 'amounts', type: 'uint256[3]' },
      { name: 'xp', type: 'uint256[3]' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'A', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'gamma', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'mid_fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', name: 'out_fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'fee_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'allowed_extra_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'adjustment_step',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'ma_time', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'precisions',
    inputs: [],
    outputs: [{ name: '', type: 'uint256[3]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'fee_calc',
    inputs: [{ name: 'xp', type: 'uint256[3]' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'DOMAIN_SEPARATOR',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'ramp_A_gamma',
    inputs: [
      { name: 'future_A', type: 'uint256' },
      { name: 'future_gamma', type: 'uint256' },
      { name: 'future_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'stop_ramp_A_gamma', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'commit_new_parameters',
    inputs: [
      { name: '_new_mid_fee', type: 'uint256' },
      { name: '_new_out_fee', type: 'uint256' },
      { name: '_new_fee_gamma', type: 'uint256' },
      { name: '_new_allowed_extra_profit', type: 'uint256' },
      { name: '_new_adjustment_step', type: 'uint256' },
      { name: '_new_ma_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'apply_new_parameters', inputs: [], outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', name: 'revert_new_parameters', inputs: [], outputs: [] },
  { stateMutability: 'view', type: 'function', name: 'WETH20', inputs: [], outputs: [{ name: '', type: 'address' }] },
  { stateMutability: 'view', type: 'function', name: 'MATH', inputs: [], outputs: [{ name: '', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'coins',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }]
  },
  { stateMutability: 'view', type: 'function', name: 'factory', inputs: [], outputs: [{ name: '', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_prices_timestamp',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_gamma_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_gamma',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_gamma_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'balances',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'D', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'xcp_profit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'xcp_profit_a',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'packed_rebalancing_params',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'packed_fee_params',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'ADMIN_FEE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_actions_deadline',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'name', inputs: [], outputs: [{ name: '', type: 'string' }] },
  { stateMutability: 'view', type: 'function', name: 'symbol', inputs: [], outputs: [{ name: '', type: 'string' }] },
  { stateMutability: 'view', type: 'function', name: 'decimals', inputs: [], outputs: [{ name: '', type: 'uint8' }] },
  { stateMutability: 'view', type: 'function', name: 'version', inputs: [], outputs: [{ name: '', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'arg0', type: 'address' },
      { name: 'arg1', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'nonces',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'salt', inputs: [], outputs: [{ name: '', type: 'bytes32' }] }
];
const stableSwapFactoryAbi = [
  {
    name: 'Transfer',
    inputs: [
      { name: 'sender', type: 'address', indexed: true },
      { name: 'receiver', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'Approval',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'TokenExchange',
    inputs: [
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'sold_id', type: 'int128', indexed: false },
      { name: 'tokens_sold', type: 'uint256', indexed: false },
      { name: 'bought_id', type: 'int128', indexed: false },
      { name: 'tokens_bought', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'AddLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[2]', indexed: false },
      { name: 'fees', type: 'uint256[2]', indexed: false },
      { name: 'invariant', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[2]', indexed: false },
      { name: 'fees', type: 'uint256[2]', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityOne',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amount', type: 'uint256', indexed: false },
      { name: 'coin_amount', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[2]', indexed: false },
      { name: 'fees', type: 'uint256[2]', indexed: false },
      { name: 'invariant', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RampA',
    inputs: [
      { name: 'old_A', type: 'uint256', indexed: false },
      { name: 'new_A', type: 'uint256', indexed: false },
      { name: 'initial_time', type: 'uint256', indexed: false },
      { name: 'future_time', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'StopRampA',
    inputs: [
      { name: 'A', type: 'uint256', indexed: false },
      { name: 't', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitNewFee',
    inputs: [{ name: 'new_fee', type: 'uint256', indexed: false }],
    anonymous: false,
    type: 'event'
  },
  { name: 'ApplyNewFee', inputs: [{ name: 'fee', type: 'uint256', indexed: false }], anonymous: false, type: 'event' },
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_symbol', type: 'string' },
      { name: '_coins', type: 'address[4]' },
      { name: '_rate_multipliers', type: 'uint256[4]' },
      { name: '_A', type: 'uint256' },
      { name: '_fee', type: 'uint256' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'approve',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'permit',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
      { name: '_deadline', type: 'uint256' },
      { name: '_v', type: 'uint8' },
      { name: '_r', type: 'bytes32' },
      { name: '_s', type: 'bytes32' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'last_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'ema_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'stored_rates',
    inputs: [],
    outputs: [{ name: '', type: 'uint256[2]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'balances',
    inputs: [{ name: 'i', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'A', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'A_precise',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'get_p', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'price_oracle',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_virtual_price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_token_amount',
    inputs: [
      { name: '_amounts', type: 'uint256[2]' },
      { name: '_is_deposit', type: 'bool' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: '_amounts', type: 'uint256[2]' },
      { name: '_min_mint_amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'add_liquidity',
    inputs: [
      { name: '_amounts', type: 'uint256[2]' },
      { name: '_min_mint_amount', type: 'uint256' },
      { name: '_receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_dy',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: 'dx', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: '_dx', type: 'uint256' },
      { name: '_min_dy', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: '_dx', type: 'uint256' },
      { name: '_min_dy', type: 'uint256' },
      { name: '_receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: '_min_amounts', type: 'uint256[2]' }
    ],
    outputs: [{ name: '', type: 'uint256[2]' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: '_min_amounts', type: 'uint256[2]' },
      { name: '_receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256[2]' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_imbalance',
    inputs: [
      { name: '_amounts', type: 'uint256[2]' },
      { name: '_max_burn_amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_imbalance',
    inputs: [
      { name: '_amounts', type: 'uint256[2]' },
      { name: '_max_burn_amount', type: 'uint256' },
      { name: '_receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'calc_withdraw_one_coin',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: 'i', type: 'int128' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: 'i', type: 'int128' },
      { name: '_min_received', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'remove_liquidity_one_coin',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: 'i', type: 'int128' },
      { name: '_min_received', type: 'uint256' },
      { name: '_receiver', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'ramp_A',
    inputs: [
      { name: '_future_A', type: 'uint256' },
      { name: '_future_time', type: 'uint256' }
    ],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'stop_ramp_A', inputs: [], outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', name: 'withdraw_admin_fees', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'commit_new_fee',
    inputs: [{ name: '_new_fee', type: 'uint256' }],
    outputs: []
  },
  { stateMutability: 'nonpayable', type: 'function', name: 'apply_new_fee', inputs: [], outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'set_ma_exp_time',
    inputs: [{ name: '_ma_exp_time', type: 'uint256' }],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'set_oracle',
    inputs: [
      { name: '_method_id', type: 'bytes4' },
      { name: '_oracle', type: 'address' }
    ],
    outputs: []
  },
  { stateMutability: 'view', type: 'function', name: 'version', inputs: [], outputs: [{ name: '', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'coins',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_balances',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'fee', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_fee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin_action_deadline',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'future_A', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initial_A_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_A_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'oracle_method',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'name', inputs: [], outputs: [{ name: '', type: 'string' }] },
  { stateMutability: 'view', type: 'function', name: 'symbol', inputs: [], outputs: [{ name: '', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'arg0', type: 'address' },
      { name: 'arg1', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  { stateMutability: 'view', type: 'function', name: 'decimals', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'DOMAIN_SEPARATOR',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'nonces',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'ma_exp_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'ma_last_time',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  }
];

const curvePairs = [
  {
    poolAddress: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
    poolName: 'stETHPool',
    lpTokenAddress: '0x06325440D014e39736583c165C2963BA99fAf14E',
    lpTokenName: 'steCRV',
    abi: 'StableSwap',
    tokens: [
      {
        symbol: 'WETH',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
      },
      {
        symbol: 'stETH',
        address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'
      }
    ]
  },
  {
    poolAddress: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
    poolName: '3Pool',
    lpTokenAddress: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
    lpTokenName: '3Crv',
    abi: 'CurvePool',
    tokens: [
      {
        symbol: 'DAI',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
      },
      {
        symbol: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      },
      {
        symbol: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
      }
    ]
  },
  {
    poolAddress: '0xa5407eae9ba41422680e2e00537571bcc53efbfd',
    poolName: 'sUSDPool',
    lpTokenAddress: '0xc25a3a3b969415c80451098fa907ec722572917f',
    lpTokenName: 'crvPlain3andSUSD',
    abi: 'susdPool',
    tokens: [
      {
        symbol: 'DAI',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
      },
      {
        symbol: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      },
      {
        symbol: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
      },
      {
        symbol: 'sUSD',
        address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51'
      }
    ]
  },
  {
    poolAddress: '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46',
    poolName: 'tricrypto2Pool',
    lpTokenAddress: '0xc4ad29ba4b3c580e6d59105fff484999997675ff',
    lpTokenName: 'crv3crypto',
    abi: 'tricryptov2',
    isCryptoV2: true,
    tokens: [
      {
        symbol: 'USDT',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
      },
      {
        symbol: 'WBTC',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
      },
      {
        symbol: 'WETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      }
    ]
  },
  {
    poolAddress: '0x5fae7e604fc3e24fd43a72867cebac94c65b404a',
    poolName: 'cbETHPool',
    lpTokenAddress: '0x5b6c539b224014a09b3388e51caaa8e354c959c8',
    lpTokenName: 'cbETHETH-f',
    isCryptoV2: true,
    abi: 'cryptov2',
    tokens: [
      {
        symbol: 'WETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      },
      {
        symbol: 'cbETH',
        address: '0xbe9895146f7af43049ca1c1ae358b0541ea49704'
      }
    ]
  },
  {
    poolAddress: '0xf5f5b97624542d72a9e06f04804bf81baa15e2b4',
    poolName: 'tricryptoUSDTPool',
    lpTokenAddress: '0xf5f5b97624542d72a9e06f04804bf81baa15e2b4',
    lpTokenName: 'crvUSDTWBTCWETH',
    abi: 'tricryptov2Factory',
    isCryptoV2: true,
    tokens: [
      {
        symbol: 'USDT',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
      },
      {
        symbol: 'WBTC',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
      },
      {
        symbol: 'WETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      }
    ]
  },
  {
    poolAddress: '0x7f86bf177dd4f3494b841a37e810a34dd56c829b',
    poolName: 'tricryptoUSDCPool',
    lpTokenAddress: '0x7f86bf177dd4f3494b841a37e810a34dd56c829b',
    lpTokenName: 'crvUSDCWBTCWETH',
    abi: 'tricryptov2Factory',
    isCryptoV2: true,
    minBlock: 17404919,
    tokens: [
      {
        symbol: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      },
      {
        symbol: 'WBTC',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
      },
      {
        symbol: 'WETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      }
    ]
  },
  {
    poolAddress: '0x9409280dc1e6d33ab7a8c6ec03e5763fb61772b5',
    poolName: 'LDOETHPool',
    lpTokenAddress: '0xb79565c01b7ae53618d9b847b9443aaf4f9011e7',
    lpTokenName: 'LDOETH-f',
    abi: 'cryptov2',
    isCryptoV2: true,
    tokens: [
      {
        symbol: 'WETH',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
      },
      {
        symbol: 'LDO',
        address: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32'
      }
    ]
  },
  {
    poolAddress: '0xb576491f1e6e5e62f1d8f26062ee822b40b0e0d4',
    poolName: 'CVXETHPool',
    lpTokenAddress: '0x3a283d9c08e8b55966afb64c515f5143cf907611',
    lpTokenName: 'crvCVXETH',
    abi: 'cryptov2',
    isCryptoV2: true,
    tokens: [
      {
        symbol: 'WETH',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
      },
      {
        symbol: 'CVX',
        address: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B'
      }
    ]
  },
  {
    poolAddress: '0x21e27a5e5513d6e65c4f830167390997aa84843a',
    poolName: 'stETHngPool',
    lpTokenAddress: '0x21e27a5e5513d6e65c4f830167390997aa84843a',
    lpTokenName: 'stETH-ng-f',
    abi: 'StableSwapFactory',
    minBlock: 17278752, // before that block, reserves are 0 and break the computing
    tokens: [
      {
        symbol: 'WETH',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
      },
      {
        symbol: 'stETH',
        address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'
      }
    ]
  }
];

const curvePricePairs = [
  {
    poolAddress: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
    poolName: '3Pool',
    abi: curvePoolAbi,
    tokens: [
      {
        symbol: 'DAI',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
      },
      {
        symbol: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      },
      {
        symbol: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
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
    poolAddress: '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46',
    poolName: 'tricrypto2Pool',
    abi: triCryptov2Abi,
    tokens: [
      {
        symbol: 'USDT',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
      },
      {
        symbol: 'WBTC',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
      },
      {
        symbol: 'WETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      }
    ],
    pairs: [
      {
        token0: 'USDT',
        token1: 'WBTC'
      },
      {
        token0: 'USDT',
        token1: 'WETH'
      },
      {
        token0: 'WETH',
        token1: 'WBTC'
      }
    ]
  },
  {
    poolAddress: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
    poolName: 'stETHPool',
    abi: stableSwapAbi,
    tokens: [
      {
        symbol: 'WETH',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
      },
      {
        symbol: 'stETH',
        address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'
      }
    ],
    pairs: [
      {
        token0: 'WETH',
        token1: 'stETH'
      }
    ]
  },
  {
    poolAddress: '0xa5407eae9ba41422680e2e00537571bcc53efbfd',
    poolName: 'sUSDPool',
    abi: susdCurvePoolAbi,
    tokens: [
      {
        symbol: 'DAI',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
      },
      {
        symbol: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      },
      {
        symbol: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
      },
      {
        symbol: 'sUSD',
        address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51'
      }
    ],
    pairs: [
      {
        token0: 'sUSD',
        token1: 'DAI'
      },
      {
        token0: 'sUSD',
        token1: 'USDC'
      },
      {
        token0: 'sUSD',
        token1: 'USDT'
      }
    ]
  },
  {
    poolAddress: '0x5fae7e604fc3e24fd43a72867cebac94c65b404a',
    poolName: 'cbETHPool',
    abi: cryptov2Abi,
    tokens: [
      {
        symbol: 'WETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      },
      {
        symbol: 'cbETH',
        address: '0xbe9895146f7af43049ca1c1ae358b0541ea49704'
      }
    ],
    pairs: [
      {
        token0: 'WETH',
        token1: 'cbETH'
      }
    ]
  },
  {
    poolAddress: '0x9409280dc1e6d33ab7a8c6ec03e5763fb61772b5',
    poolName: 'LDOETHPool',
    abi: cryptov2Abi,
    tokens: [
      {
        symbol: 'WETH',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
      },
      {
        symbol: 'LDO',
        address: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32'
      }
    ],
    pairs: [
      {
        token0: 'WETH',
        token1: 'LDO'
      }
    ]
  },
  {
    poolAddress: '0xb576491f1e6e5e62f1d8f26062ee822b40b0e0d4',
    poolName: 'CVXETHPool',
    abi: cryptov2Abi,
    tokens: [
      {
        symbol: 'WETH',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
      },
      {
        symbol: 'CVX',
        address: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B'
      }
    ],
    pairs: [
      {
        token0: 'WETH',
        token1: 'CVX'
      }
    ]
  },
  {
    poolAddress: '0x7f86bf177dd4f3494b841a37e810a34dd56c829b',
    poolName: 'tricryptoUSDCPool',
    abi: tricryptoFactoryAbi,
    tokens: [
      {
        symbol: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      },
      {
        symbol: 'WBTC',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
      },
      {
        symbol: 'WETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      }
    ],
    pairs: [
      {
        token0: 'WETH',
        token1: 'USDC'
      },
      {
        token0: 'WBTC',
        token1: 'USDC'
      }
    ]
  }
];

module.exports = {
  curveFactoryAddress,
  curvePairs,
  curvePoolAbi,
  stableSwapAbi,
  stableSwapFactoryAbi,
  erc20Abi,
  newParamAbi,
  rampAGammaAbi,
  susdCurvePoolAbi,
  cryptov2Abi,
  triCryptov2Abi,
  tricryptoFactoryAbi,
  curvePricePairs
};
