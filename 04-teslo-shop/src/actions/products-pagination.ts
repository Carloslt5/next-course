"use server";

import { Product } from "@/interfaces/product.type";
import prisma from "@/lib/prisma";

type PaginationOptionsProps = {
  page?: number;
  take?: number;
};

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptionsProps): Promise<{ products: Product[] }> => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const allProducts = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
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
