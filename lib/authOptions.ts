// const bcrypt = require("bcrypt");
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
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          const result = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });
          const user = await result.json();
          if (!user) return null;
          return user;
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
          const result = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
          });
          const user = await result.json();
          if (!user) return null;
          return user;
        } catch (error) {
          console.log(error);
          throw new Error('Error while authorizing');
        }
      }
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/register',
  },
};
