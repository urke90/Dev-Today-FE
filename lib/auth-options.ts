import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
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
          const result = await fetch('http://localhost:8080/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await result.json();

          if (!result.ok) {
            console.error('Error response from server', data);
            throw new Error('Server responded with an error');
          }

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
    async signIn({ profile, account }: any) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          const result = await fetch(
            'http://localhost:8080/api/user/login-provider',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: profile.email,
                name: profile.name,
                avatarImg: profile.picture,
              }),
            }
          );

          const user = await result.json();

          if (!user) return null;
          return user;
        } catch (error) {
          console.log(error);
          throw new Error('Error while authorizing');
        }
      }
      return true;
    },
    async session({ session, token }: any) {
      try {
        const result = await fetch(
          `http://localhost:8080/api/user/email/${session.user.email}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const resultObject = await result.json();
        if (!resultObject) return null;
        // console.log('resultObject', resultObject);
        session.user.isOnboardingCompleted =
          resultObject.user.isOnboardingCompleted;
        session.user.id = resultObject.user.id;
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
