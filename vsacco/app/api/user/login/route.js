import { signIn } from "../../auth/auth";
import { NextResponse } from 'next/server';
import { AuthError } from 'next-auth';

export async function POST(req) {
  let { idNum, password } = await req.json();
  try{
    const res = await signIn("credentials", {idNum, password});
  }
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return NextResponse.json({ message:'Invalid credentials provided!', error: error}, { status: 401 });
        default:
          return NextResponse.json({ message:'An error occured!', error: error}, { status: 500 });
      }
    }
    throw error;
  }
}
