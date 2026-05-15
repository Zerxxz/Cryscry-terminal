import { z } from 'zod';

export const chainSchema = z.enum(['ethereum', 'base', 'arbitrum', 'polygon', 'bsc']);

export const auditRequestSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/)
});

export const portfolioQuerySchema = z.object({
  chain: chainSchema.optional()
});
