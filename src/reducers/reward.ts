/**
 * @format
 */
import { SET_REWARD_POOLS } from 'src/actions/reward';
import config from 'src/utils/config';

const initialState = {
  rewardPools: [
    {
      id: 'POOL 1',
      name: 'POOL 1',
      website: 'plouto.finance',
      link: 'https://app.plouto.finance/',
      depositsEnabled: true,
      tokens: [
        {
          id: 'pDAI',
          address: '0x43c8fEA2d75639182f0426b04C89C15b43F39670',
          erc20address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          symbol: 'pDAI',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.pDAIRewardsAddress,
          rewardsABI: config.pDAIRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        },
        {
          id: 'pUSDC',
          address: '0x8439db02ade250c28f29b7A41d835E7F59D45d0C',
          erc20address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'pUSDC',
          abi: config.erc20ABI,
          decimals: 6,
          rewardsAddress: config.pUSDCRewardsAddress,
          rewardsABI: config.pUSDCRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        },
        {
          id: 'pUSDT',
          address: '0x1a4c24a7F2b03bed092c51aCFE7630F8442B15B4',
          erc20address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          symbol: 'pUSDT',
          abi: config.erc20ABI,
          decimals: 6,
          rewardsAddress: config.pUSDTRewardsAddress,
          rewardsABI: config.pUSDTRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        },
        {
          id: 'pyCRV',
          address: '0xDe379D502efbc2d075E03939864ede17c1bE75F2',
          erc20address: '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8',
          symbol: 'pyCRV',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.pyCRVRewardsAddress,
          rewardsABI: config.pyCRVRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        },
        {
          id: 'pETH/DAI LP',
          address: '0x263393Cf444Ee3F9A7Bd4C555FF8E058199AE78e',
          erc20address: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
          symbol: 'pETH/DAI LP',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.pUniETHDAILPRewardsAddress,
          rewardsABI: config.pUniETHDAILPRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        },
        {
          id: 'pETH/USDC LP',
          address: '0xa6dA33FbF799Dd04CFEa878334A7984AC9dd55BD',
          erc20address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
          symbol: 'pETH/USDC LP',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.pUniETHUSDCLPRewardsAddress,
          rewardsABI: config.pUniETHUSDCLPRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        },
        {
          id: 'pETH/USDT LP',
          address: '0x5D1939bD8E7Ad347ca246D681ce6075EaBDE4eb4',
          erc20address: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852',
          symbol: 'pETH/USDT LP',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.pUniETHUSDTLPRewardsAddress,
          rewardsABI: config.pUniETHUSDTLPRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        },
        {
          id: 'pETH/WBTC LP',
          address: '0x722Fbb7983378E5d69a6D6F6Ea69E829C21b49DD',
          erc20address: '0xbb2b8038a1640196fbe3e38816f3e67cba72d940',
          symbol: 'pETH/WBTC LP',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.pUniETHWBTCLPRewardsAddress,
          rewardsABI: config.pUniETHWBTCLPRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        }
      ]
    },
    {
      id: 'POOL 2',
      name: 'POOL 2',
      website: 'Balancer Pool 2 Token',
      link: 'https://pools.balancer.exchange/#/pool/0xd5b58830b159d86ddf229a0429817fc7d446b45c/',
      depositsEnabled: true,
      tokens: [
        {
          id: 'POOL2 BPT',
          address: '0xd5b58830b159d86ddf229a0429817fc7d446b45c',
          symbol: 'POOL2 BPT',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.bptRewardsAddress,
          rewardsABI: config.bptRewardsABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        }
      ]
    },
    {
      id: 'POOL 3',
      name: 'POOL 3',
      website: 'plouto.finance',
      link: 'https://app.plouto.finance/',
      depositsEnabled: true,
      tokens: [
        {
          id: 'PLU',
          address: '0x091D2CcF3A03cc1753DD0D62325AC5319213cb00',
          symbol: 'PLU',
          abi: config.erc20ABI,
          decimals: 18,
          rewardsAddress: config.governanceAddress,
          rewardsABI: config.governanceABI,
          rewardsSymbol: 'PLU',
          rewardsDecimals: 18,
          balance: 0,
          stakedBalance: 0,
          rewardsAvailable: 0,
          rewardPerToken: 0
        }
      ]
    }
  ]
};

const rewardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REWARD_POOLS: {
      return {
        ...state,
        rewardPools: action.payload as any[]
      };
    }

    default: {
      return state;
    }
  }
};
  
export default rewardReducer;
