import { signIn } from "../../auth/auth";

export async function POST(req) {
  let { idNum, password } = await req.json();

  idNum = parseInt(idNum);

  console.log(idNum,'---',password);

  try{
    await signIn("credentials", {idNum, password});
  }catch(err){
    throw err
  }
}
