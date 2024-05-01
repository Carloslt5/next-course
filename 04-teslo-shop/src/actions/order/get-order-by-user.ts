"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrderByUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      status: false,
      messagge: NOT_USER_SESSION,
    };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      OrderAddress: {
        select: {
          name: true,
          lastName: true,
        },
      },
    },
  });
  return {
    status: true,
    orders: orders,
  };
};
