import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth-options';

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
