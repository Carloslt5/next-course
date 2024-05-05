"use server";

import { auth } from "@/auth";
import { Role } from "@/interfaces/user.types";
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

  const mappedUsers = users.map((user) => ({
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    name: user.name,
    password: user.password,
    role: mapUserRole(user.role),
  }));

  return {
    status: true,
    users: mappedUsers,
  };
};

const mapUserRole = (role: string): Role => {
  switch (role) {
    case "admin":
      return Role.ADMIN;
    case "user":
      return Role.USER;
    default:
      return Role.USER;
  }
};
