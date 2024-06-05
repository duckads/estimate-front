import { ROOT } from '@/lib/routes';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: ROOT,
    signOut: ROOT
  },
  basePath: '/api/auth',
  callbacks: {
    authorized: async ({ auth, request }) => {
      return !!auth?.user;
    }
  },
  providers: []
} satisfies NextAuthConfig;