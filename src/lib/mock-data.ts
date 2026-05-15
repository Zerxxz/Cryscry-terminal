import { ApprovalItem, PortfolioAsset, WhaleActivity } from './types';

export const portfolioAssets: PortfolioAsset[] = [
  { symbol: 'ETH', name: 'Ethereum', chain: 'ethereum', amount: 18.4, price: 3540.2, valueUsd: 65139.68, dayChangePct: 2.3 },
  { symbol: 'SOL', name: 'Solana (Wrapped)', chain: 'base', amount: 612, price: 171.5, valueUsd: 104958, dayChangePct: -1.4 },
  { symbol: 'ARB', name: 'Arbitrum', chain: 'arbitrum', amount: 22000, price: 0.99, valueUsd: 21780, dayChangePct: 7.2 }
];

export const whaleActivities: WhaleActivity[] = [
  { wallet: '0x91a...f2d', label: 'Fund Alpha', token: 'PEPE', eventType: 'buy', amountUsd: 420000, timestamp: '2026-05-15T13:00:00Z', txHash: '0xabc123' },
  { wallet: '0x02d...c81', label: 'Smart Wallet #19', token: 'ETH', eventType: 'bridge', amountUsd: 2500000, timestamp: '2026-05-15T12:40:00Z', txHash: '0xabc124' },
  { wallet: '0x991...11a', label: 'Whale Sigma', token: 'AAVE', eventType: 'stake', amountUsd: 730000, timestamp: '2026-05-15T12:10:00Z', txHash: '0xabc125' }
];

export const approvals: ApprovalItem[] = [
  { id: 'ap-1', token: 'USDC', spender: '0x2fA...9b2', chain: 'ethereum', allowance: 'Unlimited', risk: 'high', revokeReady: true },
  { id: 'ap-2', token: 'WETH', spender: '0x31D...77a', chain: 'arbitrum', allowance: '37.4', risk: 'medium', revokeReady: true },
  { id: 'ap-3', token: 'USDT', spender: '0xa84...0Ee', chain: 'base', allowance: 'Unlimited', risk: 'high', revokeReady: true }
];
