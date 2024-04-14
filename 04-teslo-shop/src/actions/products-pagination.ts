"use server";

import prisma from "@/lib/prisma";

type PaginationOptionsProps = {
  page?: number;
  take?: number;
};

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptionsProps) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const allProducts = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: { ProductImage: { take: 2, select: { url: true } } },
    });

    const totalCount = await prisma.product.count({});
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPages: page,
      totalPages: totalPages,
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
