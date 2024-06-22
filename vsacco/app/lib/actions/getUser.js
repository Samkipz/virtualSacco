"use server"
import { auth } from "@/app/api/auth/auth";

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