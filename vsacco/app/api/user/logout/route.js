import { signOut } from "../../auth/auth";

export async function POST(req) {
  try{
    await signOut()
  }catch(err){
    throw err
  }
}

