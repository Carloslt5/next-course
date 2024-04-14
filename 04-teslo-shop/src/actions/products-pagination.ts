"use server";

import { Product } from "@/interfaces/product.type";
import prisma from "@/lib/prisma";

export const getPaginatedProductsWithImages = async (): Promise<{ products: Product[] }> => {
  try {
    const allProducts = await prisma.product.findMany({
      include: { ProductImage: { take: 2, select: { url: true } } },
    });

    return {
      products: allProducts.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
