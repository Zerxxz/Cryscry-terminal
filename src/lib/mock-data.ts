import { ApprovalItem, PortfolioAsset, WhaleActivity } from './types';

export const portfolioAssets: PortfolioAsset[] = [
  { id: 'eth-1', symbol: 'ETH', name: 'Ethereum', chain: 'ethereum', amount: 18.4, price: 3540.2, valueUsd: 65139.68, dayChangePct: 2.3, allocationPct: 34.0 },
  { id: 'solb-1', symbol: 'SOL', name: 'Wrapped Solana', chain: 'base', amount: 612, price: 171.5, valueUsd: 104958, dayChangePct: -1.4, allocationPct: 54.8 },
  { id: 'arb-1', symbol: 'ARB', name: 'Arbitrum', chain: 'arbitrum', amount: 22000, price: 0.99, valueUsd: 21780, dayChangePct: 7.2, allocationPct: 11.2 }
];

export const whaleActivities: WhaleActivity[] = [
  { id: 'wh-1', wallet: '0x91a...f2d', label: 'Fund Alpha', token: 'PEPE', eventType: 'buy', amountUsd: 420000, timestamp: '2026-05-15T13:00:00Z', txHash: '0xabc123', chain: 'ethereum' },
  { id: 'wh-2', wallet: '0x02d...c81', label: 'Smart Wallet #19', token: 'ETH', eventType: 'bridge', amountUsd: 2500000, timestamp: '2026-05-15T12:40:00Z', txHash: '0xabc124', chain: 'base' },
  { id: 'wh-3', wallet: '0x991...11a', label: 'Whale Sigma', token: 'AAVE', eventType: 'stake', amountUsd: 730000, timestamp: '2026-05-15T12:10:00Z', txHash: '0xabc125', chain: 'arbitrum' }
];

export const approvals: ApprovalItem[] = [
  { id: 'ap-1', token: 'USDC', spender: '0x2fA...9b2', chain: 'ethereum', allowance: 'Unlimited', risk: 'high', revokeReady: true, lastUsedAt: '2026-05-15T09:30:00Z' },
  { id: 'ap-2', token: 'WETH', spender: '0x31D...77a', chain: 'arbitrum', allowance: '37.4', risk: 'medium', revokeReady: true, lastUsedAt: '2026-05-13T15:11:00Z' },
  { id: 'ap-3', token: 'USDT', spender: '0xa84...0Ee', chain: 'base', allowance: 'Unlimited', risk: 'high', revokeReady: true, lastUsedAt: '2026-05-15T11:52:00Z' }
];
