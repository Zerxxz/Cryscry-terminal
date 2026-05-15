import { whaleActivities } from '@/lib/mock-data';
import { ok } from '../_utils/response';

export async function GET() {
  return ok(whaleActivities);
}
