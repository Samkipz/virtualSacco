import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from "@/auth.config"
import prisma from "@/app/lib/prisma"
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

// const login = async (credentials) =>{
//     try{
//         // let idNumInt = parseInt(credentials.idNum);
        
//         const user = await prisma.user.findUnique({
//             where:{
//                 idNm: credentials.idNum
//             }
//         })
//         if (user) console.log("User is in --", user);
//         return user;
//     }catch(err){
//       console.error('Failed to fetch user:', err);
//       // throw new Error('Failed to fetch user.');
//       return NextResponse.json({ error:'Failed to fetch user.'}, { status: 400 });
//         // console.log(err);
//         // throw new Error("Wrong credentials provided!");
//     }
// }

async function getUser(idNum) {
  try {
    const user = await prisma.user.findUnique({
      where:{
          idNum: idNum
      }
    })
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { idNum, password } = credentials;
        const user = await getUser(idNum);
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
      // console.log("USER IS >>> --- ",user);
      if (user) {
        token.userId = user.id,
        token.firstname = user.firstname,
        token.othernames = user.othernames,
        token.idNum = user.idNum,
        token.isAdmin = user.isAdmin
      }
      return token;
    },
    async session({session, token}){
      if (token) {
        session.userId = token.userId,
        session.firstname = token.firstname,
        session.othernames = token.othernames,
        session.idNum = token.idNum,
        session.isAdmin = token.isAdmin
      }
      return session;
    },
  }
})