"use server"
import { auth } from "@/app/api/auth/auth";
import prisma from "../prisma";
import { NextResponse } from "next/server";

//Fetch current user info from session.
//This data can be passed to client components.
export async function getUser(){
    const session = await auth();
    let currentUser;
    if (session){
        currentUser = session;
    }else{
        currentUser = null;
    }
    return currentUser;
}

//Fetch user from db -------- > intended to be used in user profile page.
// export async function getUserProfile(session){
//     const userIdNum = session.idNum;

//     try{
//         const user = await prisma.user.findUnique({
//             where:{
//                 idNum: userIdNum,
//             }
//         })
//         return new NextResponse(JSON.stringify(user),{status: 200});
//     }catch(err){
//         console.log("An error occured fetching user from db",err)
//     }
// }