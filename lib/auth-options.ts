import { BASE_API_URL } from '@/api/queries';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// ----------------------------------------------------------------

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;

          const response = await fetch(BASE_API_URL + '/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            console.error('Error response from server', response);
            throw new Error('Server responded with an error');
          }

          const data = await response.json();

          if (!data?.user) return null;

          return data.user;
        } catch (error) {
          console.log(error);
          throw new Error('Error while authorizing');
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          const response = await fetch(BASE_API_URL + '/user/login-provider', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user?.email,
              name: user?.name,
              avatarImg: user?.image,
            }),
          });

          const createdUser = await response.json();
          if (!createdUser) return false;

          return true;
        } catch (error) {
          console.log(error);
          throw new Error('Error while authorizing');
        }
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.email) return token;
      try {
        const response = await fetch(
          BASE_API_URL + `/user/email/${token.email}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        if (data) {
          token.id = data.user.id;
          token.isOnboardingCompleted = data.user.isOnboardingCompleted;
          token.name = data.user.userName;
        }
      } catch (error) {
        console.log('Error inside jwt callback', error);
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (token.id) {
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.isOnboardingCompleted = token.isOnboardingCompleted;
        }
      } catch (error) {
        console.error('signIn error: ', error);
        throw new Error('Error while signing in');
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/register',
  },
};
