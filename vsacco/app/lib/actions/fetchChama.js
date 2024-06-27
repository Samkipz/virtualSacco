"use server";
import prisma from "../prisma";

// fetch a Chama
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
        }
    });

    console.log('======>>',JSON.stringify(chama,null,2));


}