"use server";

import { auth } from "@/auth";
import { Address } from "@/interfaces/address.type";
import { Size } from "@/interfaces/product.type";
import prisma from "@/lib/prisma";

interface ProductOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIds: ProductOrder[], address: Address) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      status: false,
      messagge: "Not session",
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((item) => item.productId),
      },
    },
  });

  const itemsInOrder = productIds.reduce((count, product) => count + product.quantity, 0);

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} not exitst - 500`);

      const subtotal = product.price * productQuantity;

      totals.subTotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Create Transaction
  const prismaTX = await prisma.$transaction(async (tx) => {
    // Update stock product
    // Create order
    const order = await tx.order.create({
      data: {
        userId: userId,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        tax: tax,
        total: total,

        OrderItem: {
          createMany: {
            data: productIds.map((item) => ({
              quantity: item.quantity,
              size: item.size,
              productId: item.productId,
              price: products.find((product) => product.id === item.productId)?.price ?? 0,
            })),
          },
        },
      },
    });

    // Create order address
    const { country, ...restAddress } = address;
    const orderAddress = await tx.orderAddress.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order.id,
      },
    });

    return {
      order: order,
      orderAddress: orderAddress,
    };
  });
};
