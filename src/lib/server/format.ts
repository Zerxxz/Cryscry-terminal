export const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function compactHash(hash: string) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}
