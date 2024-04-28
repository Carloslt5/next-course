"use server";

import { Address } from "@/interfaces/address.type";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userID: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userID);
    return {
      status: true,
      address: newAddress,
    };
  } catch (error) {
    return {
      status: false,
      messgge: "Can not save address",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userID: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userID,
      },
    });

    const addresstoSave = {
      userId: userID,
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      lastName: address.lastName,
      name: address.name,
      phone: address.phone,
      zipCode: address.zipCode,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addresstoSave,
      });
      return newAddress;
    }

    const updateAddress = await prisma.userAddress.update({
      where: { userId: userID },
      data: addresstoSave,
    });
    return updateAddress;
  } catch (error) {
    throw new Error("Can not save address");
  }
};
