import { NextResponse } from 'next/server';
import { approvals } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(approvals);
}
