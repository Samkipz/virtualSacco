import { signIn } from "../../auth/auth";
import { NextResponse } from 'next/server';

export async function POST(req) {
  let { idNum, password } = await req.json();
  idNum = parseInt(idNum);
  
  try{
    await signIn("credentials", {idNum, password});
  }catch(err){
    // throw new Error("Some Wrong credentials provided!", err);
    return NextResponse.json({ message: err, error: err.error }, { status: 500 });
  }
}
