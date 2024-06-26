import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const createUser = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password, 10),
      name: email.split("@")[0],
    },
  });
  return createUser;
};
