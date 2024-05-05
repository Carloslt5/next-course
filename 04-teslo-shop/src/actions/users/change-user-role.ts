"use server";

import { auth } from "@/auth";
import { Role } from "@/interfaces/user.types";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeRole = async (userID: string, role: string) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      status: false,
      messagge: NOT_USER_ADMIN,
    };
  }

  try {
    const newRole = role === Role.ADMIN ? Role.ADMIN : Role.USER;
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");
    return { status: true };
  } catch (error) {
    return {
      status: false,
      message: "Can not change user role",
    };
  }
};
