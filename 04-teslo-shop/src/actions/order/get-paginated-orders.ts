"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      status: false,
      messagge: NOT_USER_SESSION,
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
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
