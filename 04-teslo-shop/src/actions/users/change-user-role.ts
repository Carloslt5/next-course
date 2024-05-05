"use server";

import { auth } from "@/auth";
import { UserRole } from "@/interfaces/user.types";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userID: string, role: string) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      status: false,
      messagge: NOT_USER_ADMIN,
    };
  }

  try {
    const newRole = role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER;
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
