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
      messagge: NOT_USER_SESSION,
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
  try {
    const prismaTX = await prisma.$transaction(async (tx) => {
      // Update stock product
      const updateProductsPromises = products.map(async (product) => {
        const productQuantity = productIds
          .filter((item) => item.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id}, is not defined`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updateProductsPromises);
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title}, not stock`);
        }
      });

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
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      status: true,
      order: prismaTX.order,
      prismaTX: prismaTX,
    };
  } catch (error: any) {
    return {
      status: false,
      messagge: error?.message,
    };
  }
};
