"use server";

import { auth } from "@/auth";
import { Address } from "@/interfaces/address.type";
import { Size } from "@/interfaces/product.type";

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

  console.log("🚀 --------- session", userId);
  console.log({ productIds, address });
};
