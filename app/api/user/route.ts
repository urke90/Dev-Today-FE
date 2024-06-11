import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  return Response.json(session);
}
