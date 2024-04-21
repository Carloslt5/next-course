import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import * as z from "zod";
import { authConfig } from "./auth.config";
import prisma from "./lib/prisma";

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
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
});
