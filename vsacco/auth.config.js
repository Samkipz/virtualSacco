export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 3 * 60,  // Set session duration to 5 minutes (300 seconds)
    updateAge: 3 * 60,  // Update the session maxAge only if the user has been active within 5 minutes
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

        // Set session expiration to 5 minutes from now
        // const currentTime = Date.now();
        // session.expires = new Date(currentTime + 3 * 60 * 1000).toISOString();
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
    async authorized({auth }) {
      const isLoggedIn = !!auth?.user;
      return isLoggedIn; 
    },
  },
  providers: [], // Add providers here
};
