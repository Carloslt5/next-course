"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userID: string) => {
  try {
    const getAddress = await prisma.userAddress.findUnique({ where: { userId: userID } });
    if (!getAddress) return null;

    const { countryId, address2, ...rest } = getAddress;

    return {
      status: true,
      data: {
        ...rest,
        country: countryId,
        address2: address2 ? address2 : "",
      },
    };
  } catch (error) {
    return null;
  }
};
