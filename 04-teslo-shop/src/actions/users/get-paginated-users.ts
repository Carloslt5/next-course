"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      status: false,
      messagge: NOT_USER_ADMIN,
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
  });
  console.log("🚀 --------- users", users);

  return {
    status: true,
    users: users,
  };
};
