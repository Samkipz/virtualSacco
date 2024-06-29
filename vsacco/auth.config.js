export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin;
      return session;
    },
    async authorized({ req }) {
      const token = await getToken({ req, secret: process.env.AUTH_SECRET });
      const isLoggedIn = !!token;
      return isLoggedIn; 
    },
  },
  providers: [], // Add providers here
};
