export type Chain = {
  id: string;
  name: string;
};

export type Token = {
  id: string;
  name: string;
  symbol: string;
  chain: string;
};

export const CHAINS: Chain[] = [
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'binance-smart-chain', name: 'BNB Chain' },
  { id: 'polygon', name: 'Polygon' },
  { id: 'avalanche', name: 'Avalanche' },
];

export const TOKENS: Token[] = [
  { id: 'eth', name: 'Ether', symbol: 'ETH', chain: 'ethereum' },
  { id: 'usdc_eth', name: 'USD Coin', symbol: 'USDC', chain: 'ethereum' },
  { id: 'wbtc_eth', name: 'Wrapped BTC', symbol: 'WBTC', chain: 'ethereum' },

  { id: 'bnb', name: 'BNB', symbol: 'BNB', chain: 'binance-smart-chain' },
  { id: 'busd', name: 'Binance USD', symbol: 'BUSD', chain: 'binance-smart-chain' },
  { id: 'cake', name: 'PancakeSwap', symbol: 'CAKE', chain: 'binance-smart-chain' },

  { id: 'matic', name: 'Matic', symbol: 'MATIC', chain: 'polygon' },
  { id: 'usdc_poly', name: 'USD Coin', symbol: 'USDC', chain: 'polygon' },
  { id: 'weth_poly', name: 'Wrapped Ether', symbol: 'WETH', chain: 'polygon' },

  { id: 'avax', name: 'Avalanche', symbol: 'AVAX', chain: 'avalanche' },
  { id: 'usdc_avax', name: 'USD Coin', symbol: 'USDC', chain: 'avalanche' },
  { id: 'weth_avax', name: 'Wrapped Ether', symbol: 'WETH', chain: 'avalanche' },
];
