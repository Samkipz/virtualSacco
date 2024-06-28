import prisma from '@/app/lib/prisma'
import React from 'react'

export default async function Page({params}){
    const ch = params.chama //--- chama for the time being since we havent created sacco
    const test = await prisma.chama.findFirst({
        where:{
            name: ch
        } 
    });

    if (test)console.log("It worked ---- ",test);
    return (
      <div>My slug is: {params.sacco}</div>
    )
  }