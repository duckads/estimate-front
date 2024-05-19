'use server';

import { AuthError } from 'next-auth';
import { signIn } from '.';

export async function authenticate(
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return '로그인 실패';
    }
    throw error;
  }
}