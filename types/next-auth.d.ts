import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique ID. */
      id: string;
      /** Has user finished onboarding steps. */
      isOnboardingCompleted: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    /** OCurrent step of user onboarding process. If value is 5 then onboarding is finished */
    isOnboardingCompleted: boolean;
    /** Fetched image from DB */
    // avatarImg: string;
  }
}
