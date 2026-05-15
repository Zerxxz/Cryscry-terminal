import { NextRequest } from 'next/server';
import { auditRequestSchema } from '@/lib/validators/api';
import { fail, ok } from '../_utils/response';

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return fail('Invalid JSON payload');
  }

  const parsed = auditRequestSchema.safeParse(body);
  if (!parsed.success) return fail('Invalid contract address format');

  const { address } = parsed.data;
  const findings = [
    { check: 'Owner privileges', severity: 'medium', status: 'warn', details: 'Owner can pause transfers.' },
    { check: 'Proxy pattern', severity: 'low', status: 'pass', details: 'No upgradeable proxy detected.' },
    { check: 'Blacklist functions', severity: 'high', status: 'warn', details: 'Blacklist mapping found in ABI metadata.' }
  ] as const;

  return ok({ address, riskScore: 68, verdict: 'Moderate to high operational risk', findings });
}
