export const CONTRACTS = {
  INSURANCE: {
    address: process.env.NEXT_PUBLIC_INSURANCE_CONTRACT || '0x0000000000000000000000000000000000000000',
    abi: [
      'function createPolicy(uint256 _coverage, uint256 _premium, uint256 _duration, uint8 _riskScore, uint8 _policyType) payable returns (uint256)',
      'function fileClaim(uint256 _policyId, uint256 _amount, bytes32 _evidenceHash, bytes _zkProof) returns (uint256)',
      'function payPremium(uint256 _policyId) payable',
      'function stake() payable',
      'function withdraw(uint256 _amount)',
      'function getUserPolicies(address _user) view returns (uint256[])',
      'function getPolicyDetails(uint256 _policyId) view returns (tuple)',
      'function getClaimDetails(uint256 _claimId) view returns (tuple)',
      'function totalValueLocked() view returns (uint256)',
      'event PolicyCreated(uint256 indexed policyId, address indexed policyholder, uint256 coverage)',
      'event ClaimFiled(uint256 indexed claimId, uint256 indexed policyId, uint256 amount)',
      'event ClaimProcessed(uint256 indexed claimId, uint8 status)',
    ],
  },
} as const

export const CHAIN_CONFIG = {
  arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    network: 'arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://arb1.arbitrum.io/rpc'] },
      public: { http: ['https://arb1.arbitrum.io/rpc'] },
    },
    blockExplorers: {
      default: { name: 'Arbiscan', url: 'https://arbiscan.io' },
    },
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    network: 'optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://mainnet.optimism.io'] },
      public: { http: ['https://mainnet.optimism.io'] },
    },
    blockExplorers: {
      default: { name: 'Optimism Explorer', url: 'https://optimistic.etherscan.io' },
    },
  },
  base: {
    id: 8453,
    name: 'Base',
    network: 'base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://mainnet.base.org'] },
      public: { http: ['https://mainnet.base.org'] },
    },
    blockExplorers: {
      default: { name: 'Basescan', url: 'https://basescan.org' },
    },
  },
} as const
