import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { Session } from 'next-auth';
import NextAuth, { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth-options';

type HandlerType = typeof NextAuth;

/**
 * User this function instead of the default getServerSession
 */
export const auth = (
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<Session | null> => {
  return getServerSession(...args, authOptions);
};

const handler: HandlerType = NextAuth(authOptions);

export { handler as GET, handler as POST };
