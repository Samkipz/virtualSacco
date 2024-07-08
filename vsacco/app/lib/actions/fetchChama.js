"use server";
import { auth } from "@/app/api/auth/auth";
import prisma from "../prisma";
import { NextResponse } from "next/server";

// fetch a Chama with it's relations. Deep fetch.
export async function fetchChama(chamaId) {
    console.log('======>>',chamaId);

    const id = parseInt(chamaId);
    const chama = await prisma.chama.findUnique({
        where:{
            id:id,
        },
        include:{
            user_has_chama:{
                include:{
                    user:{
                        include: true
                    }
                }
            }
        },
    });

    // --- Convert binary data to base64 string ---
    // Client components only support plain JSON objects, 
    // so you need to convert the binary data (Uint8Array objects) into a string or handle it differently.
    chama.user_has_chama.forEach(userHasChama => {
        if (userHasChama.user.idFile) {
            userHasChama.user.idFile = Buffer.from(userHasChama.user.idFile).toString('base64');
        }
    });

    // console.log('======>>',JSON.stringify(chama,null,2));
    return chama;
}

//fetch single chama for a particular user
export async function getUsersChama(chamaId){
    // get user
    const session = await auth();
    if(!session){
        return { success: false, message: "You must be logged in to view the contents of this page" };
    }

    const userId = parseInt(session.userId)

    const {user, firstname, othernames} = session

    const userChama = await prisma.user_has_chama.findFirst({
        where:{
            chama_id: chamaId,
            user_id: userId
        }
    });

    const chama = await prisma.chama.findUnique({
        where:{
            id:chamaId,
        }
    })
    return { success: true, data: {user, firstname, othernames, userChama, chama}, message: "Users chama fetched" };
}


//count users in  chama
export async function userCount(chamaId) {
    const id = parseInt(chamaId);

    const userCount = await prisma.user_has_chama.groupBy({
        by: ['chama_id'],
        where:{
            chama_id:id,
        },
        _count: {
            user_id: true,
        },
    });
    console.log('User count ======>>',userCount);
    return userCount;
}