import { approvals } from '@/lib/mock-data';
import { ok } from '../_utils/response';

export async function GET() {
  return ok(approvals.sort((a, b) => (a.risk < b.risk ? 1 : -1)));
}
