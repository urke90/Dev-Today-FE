import { AuthOptions } from 'next-auth';
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

          const response = await fetch('http://localhost:8080/api/user/login', {
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
          const response = await fetch(
            'http://localhost:8080/api/user/login-provider',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user?.email,
                name: user?.name,
                avatarImg: user?.image,
              }),
            }
          );

          const createdUser = await response.json();
          if (!createdUser) return null;

          return createdUser;
        } catch (error) {
          console.log(error);
          throw new Error('Error while authorizing');
        }
      }

      return true;
    },
    async session({ session }) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/email/${session.user.email}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (!data) return session;

        session.user.isOnboardingCompleted = data.user.isOnboardingCompleted;
        session.user.id = data.user.id;
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
