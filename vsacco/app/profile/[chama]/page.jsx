import prisma from '@/app/lib/prisma'
import React from 'react'

export default async function Page({params}){
    const ch = params.chama
    const test = await prisma.chama.findFirst({
        where:{
            name: ch
        }
    });

    if (test)console.log("It worked ---- ",test);
    return (
      <div>My slug is: {params.chama}</div>
    )
  }