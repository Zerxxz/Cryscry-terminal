export type Chain = 'ethereum' | 'base' | 'arbitrum' | 'polygon' | 'bsc';

export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  chain: Chain;
  amount: number;
  price: number;
  valueUsd: number;
  dayChangePct: number;
  allocationPct: number;
}

export interface WhaleActivity {
  id: string;
  wallet: string;
  label: string;
  token: string;
  eventType: 'buy' | 'sell' | 'bridge' | 'stake';
  amountUsd: number;
  timestamp: string;
  txHash: string;
  chain: Chain;
}

export interface ApprovalItem {
  id: string;
  token: string;
  spender: string;
  chain: Chain;
  allowance: string;
  risk: 'low' | 'medium' | 'high';
  revokeReady: boolean;
  lastUsedAt: string;
}

export interface ContractRiskFinding {
  check: string;
  severity: 'low' | 'medium' | 'high';
  status: 'pass' | 'warn';
  details: string;
}
