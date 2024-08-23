export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
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
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.isAdmin = user.isAdmin;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   session.user.isAdmin = token.isAdmin;
    //   return session;
    // },
    async authorized({auth }) {
      // const token = await getToken({ req, secret: process.env.AUTH_SECRET });
      const isLoggedIn = !!auth?.user;
      return isLoggedIn; 
    },
  },
  providers: [], // Add providers here
};
