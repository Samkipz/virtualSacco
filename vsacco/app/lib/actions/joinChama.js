"use server"
import prisma from "../prisma";

import { auth } from "@/app/api/auth/auth";

export async function joinChama(chama){
    console.log("Join chama button!");

    const session = await auth();
    if (session){
      console.log(">>>>>",chama)
      console.log(">>>>>",session.userId)
      
      try{
        // check db the user status
        const userStatus = await prisma.user_has_chama.findUnique({
            where:{
                id: session.userId,
            }
        });
        const userChama = chama.id;
        const user = session.firstname;
      }catch(err){
        console.log("An error occured>>>",err);
        throw new Error("An error occured saving user!")
      }
    }else{
      console.log(">>>>>No user logged in!")
    }
}