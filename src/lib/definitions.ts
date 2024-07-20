import { type DefaultSession } from 'next-auth';

export type User = {
  email: string,
  name: string,
  accessToken: string
}

export type CustomToken = {
  id?: string,
  name: string,
  email: string
  accessToken?: string;
}

export type CustomSession = DefaultSession & {
  accessToken?: string;
}