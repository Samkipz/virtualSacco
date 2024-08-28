import { signIn } from "../../auth/auth";
import { NextResponse } from 'next/server';
import { AuthError } from 'next-auth';

export async function POST(req) {
  let { idNum, password } = await req.json();
  try{
    await signIn("credentials", {idNum, password});
    // return NextResponse.json({ message:'Login successful!'}, { status: 200 });
  }
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return NextResponse.json({ message:'Invalid credentials provided!', error: error}, { status: 401 });
        default:
          return NextResponse.json({ message:'Some other error occured! try again', error: error}, { status: 500 });
      }
    }
    throw error;
  }
}
