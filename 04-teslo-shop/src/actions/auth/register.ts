"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        password: bcrypt.hashSync(password, 10),
        email: email.toLowerCase(),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return {
      status: true,
      messgge: "Created user",
      data: user,
    };
  } catch (error) {
    return {
      status: false,
      messgge: "Can not created user",
    };
  }
};
