import { type NextAuthConfig } from "next-auth";

const protectedRoutes = ["/profile", "/checkout", "/orders"];
const isRouteProtected = (requestedPath: string): boolean => {
  return protectedRoutes.some((route) => requestedPath.startsWith(route));
};

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isRouteProtected(nextUrl.pathname)) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, user, token }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
