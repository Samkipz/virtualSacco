'use server';
import { signIn } from '@/app/api/auth/auth';
import { AuthError } from 'next-auth';

export async function authenticate() {
  try {
    await signIn('credentials', {idNum, password});
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return 'Invalid credentials provided.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}