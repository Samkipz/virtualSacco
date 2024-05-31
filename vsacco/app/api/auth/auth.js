import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "@/auth.config"
import prisma from "@/app/lib/prisma"
import bcrypt from "bcrypt"

const login = async (credentials) =>{
    try{
        let idNumInt = parseInt(credentials.idNum);
        
        const user = await prisma.user.findUnique({
            where:{
                idNum: idNumInt
            }
        })
        if (!user) throw new Error("Wrong credentials provided!");
        const isPasswordCorrect = await bcrypt.compare(
            credentials.password, user.password
        );
        if (!isPasswordCorrect) throw new Error("Wrong credentials provided!");
        return user;
    }catch(err){
        console.log(err);
        throw new Error("Failed to log in!");
    }
}
 
export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
  providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
          idNum: { label: "ID Number", type: "number" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          try {
            console.log("--------------- credentials----", credentials)
            const user = await login(credentials);
            return user;
          } catch (err) {
            return null;
          }
        },
      }),
    // CredentialsProvider({
    //   async authorize({ credentials }) {

    //     try{
    //         const user = await login(credentials);
    //         return user;
    //     }catch(err){
    //         return null;
    //     }
    //   },
    // }),
  ],
})