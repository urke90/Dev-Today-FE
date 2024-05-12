import { authOptions } from '@/lib/auth-options';
import NextAuth from 'next-auth/next';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';

type HandlerType = typeof NextAuth;

// declare module 'next-auth' {
//   interface Session {
//     id: string;
//     name: string;
//   }
// }

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
