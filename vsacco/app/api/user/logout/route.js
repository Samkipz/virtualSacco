import { signOut } from "../../auth/auth";

export async function POST() {
  try{
    await signOut()
  }catch(err){
    throw err
  }
}

