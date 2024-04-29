"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userID: string) => {
  try {
    const deletedAddress = await prisma.userAddress.delete({
      where: { userId: userID },
    });
    return { status: true };
  } catch (error) {
    return {
      status: false,
      messgge: "Can not delete address",
    };
  }
};
