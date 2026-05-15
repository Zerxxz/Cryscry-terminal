import { portfolioAssets } from '@/lib/mock-data';
import { portfolioQuerySchema } from '@/lib/validators/api';
import { fail, ok } from '../_utils/response';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = portfolioQuerySchema.safeParse({ chain: searchParams.get('chain') ?? undefined });

  if (!parsed.success) return fail('Invalid chain query parameter');

  const filtered = parsed.data.chain
    ? portfolioAssets.filter((asset) => asset.chain === parsed.data.chain)
    : portfolioAssets;

  return ok(filtered);
}
