"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrderByID = async (id: string) => {
  const session = await auth();
  if (!session) {
    return {
      status: false,
      message: NOT_USER_SESSION,
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `Order ${id} not exist`;
    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw `Order ${id} not belong to the ${session.user.id}`;
      }
    }

    return {
      status: true,
      order: order,
    };
  } catch (error) {
    return {
      status: false,
      message: "order not exist",
    };
  }
};
