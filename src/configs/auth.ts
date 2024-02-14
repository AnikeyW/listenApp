import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GGOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', requared: true },
        password: { label: 'Password', type: 'password', requared: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        //todo
        //тут можно делать запрос на бэк
        // если авторизация прошла успешно вернуть пользователя, если нет - null

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
};
