import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      emailVerified?: boolean;
      image?: string;
      name: string;
      role: string;
    } & DefaultSession["user"];
  }
}
