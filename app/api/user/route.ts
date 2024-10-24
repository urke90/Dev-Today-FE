import { auth } from '@/lib/auth';

// ---

export async function GET(request: Request) {
  const session = await auth();
  return Response.json(session);
}
