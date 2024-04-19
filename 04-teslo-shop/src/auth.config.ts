import bcrypt from "bcrypt";
import NextAuth, { type NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("🚀 --------- token", { token, user });
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, user, token }) {
      // console.log("🚀 --------- session", { session, token, user });
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        //Find User
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) return null;
        //Check password
        if (!bcrypt.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
