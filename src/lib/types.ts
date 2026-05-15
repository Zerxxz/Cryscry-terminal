export type Chain = 'ethereum' | 'base' | 'arbitrum' | 'polygon' | 'bsc';

export interface PortfolioAsset {
  symbol: string;
  name: string;
  chain: Chain;
  amount: number;
  price: number;
  valueUsd: number;
  dayChangePct: number;
}

export interface WhaleActivity {
  wallet: string;
  label: string;
  token: string;
  eventType: 'buy' | 'sell' | 'bridge' | 'stake';
  amountUsd: number;
  timestamp: string;
  txHash: string;
}

export interface ApprovalItem {
  id: string;
  token: string;
  spender: string;
  chain: Chain;
  allowance: string;
  risk: 'low' | 'medium' | 'high';
  revokeReady: boolean;
}
