import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { API_URL, METHOD } from '@/lib/apis';
import { User } from '@/lib/definitions';
import { fetchDataWithHeader } from '@/lib/request';
import { DEFAULT_REDIRECT, ROOT } from '@/lib/routes';
import { authConfig } from './auth.config';

/**
 * 로그인 요청을 보내고 accessToken의 정보를 반환하는 함수
 * 
 * @param { any } credentials - 로그인 데이터 json 형식
 * @returns { Promise<any> } - 요청이 성공하면 JSON 데이터가 포함된 Promise를 반환
 */
async function login(credentials: any): Promise<any> {
  const res = await fetchDataWithHeader(API_URL.AUTH.SIGNIN, {
    method: METHOD.POST,
    body: JSON.stringify({ username: credentials?.email, password: credentials?.password })
  });
  return res;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials || !credentials.email || !credentials.password) return null;

        // let loginRes = await login(credentials);
        // console.log(loginRes)
        // loginRes = {
        //   success: true,
        //   user: loginRes
        // };
        let loginRes = {
          success: true,
          user: {
            name: '홍길동',
            accessToken: '1234'
          }
        };

        if (!loginRes.success) return null;
        const user = {
          email: credentials.email,
          name: loginRes.user.name ?? '',
          accessToken: loginRes.user.token ?? ''
        } as User;

        return user;
      }
    })
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      return true;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url ===  `${ baseUrl }${ ROOT }`) {
        return DEFAULT_REDIRECT;
      }
      return baseUrl;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});