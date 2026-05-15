import { NextResponse } from 'next/server';
import { portfolioAssets } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(portfolioAssets);
}
