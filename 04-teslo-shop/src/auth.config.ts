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
        console.log("🚀 --------- rest", { rest });
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth } = NextAuth(authConfig);
