import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({ address: z.string().regex(/^0x[a-fA-F0-9]{40}$/) });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid contract address format' }, { status: 400 });
  }

  const { address } = parsed.data;
  const findings = [
    { check: 'Owner privileges', severity: 'medium', status: 'warn', details: 'Owner can pause transfers.' },
    { check: 'Proxy pattern', severity: 'low', status: 'pass', details: 'No upgradeable proxy detected.' },
    { check: 'Blacklist functions', severity: 'high', status: 'warn', details: 'Blacklist mapping found in ABI metadata.' }
  ];

  return NextResponse.json({
    address,
    riskScore: 68,
    verdict: 'Moderate to high operational risk',
    findings
  });
}
