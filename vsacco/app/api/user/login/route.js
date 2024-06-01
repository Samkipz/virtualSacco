import { signIn } from "../../auth/auth";

export async function POST(req) {
  let { idNum, password } = await req.json();
  idNum = parseInt(idNum);
  
  try{
    await signIn("credentials", {idNum, password});
  }catch(err){
    throw err
  }
}
