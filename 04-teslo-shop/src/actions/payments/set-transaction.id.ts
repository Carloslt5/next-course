"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (orderID: string, transactionID: string) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderID },
      data: { transactionId: transactionID },
    });

    if (!order) {
      return {
        status: false,
        messagge: `Can not find order - ${orderID}`,
      };
    }

    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      messagge: "Can not update ID transaction",
    };
  }
};
