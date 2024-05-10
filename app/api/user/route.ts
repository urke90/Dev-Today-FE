import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  return Response.json(session);
}
