"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

type PaginationOptionsProps = {
  page?: number;
  take?: number;
  gender?: Gender;
};

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptionsProps) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const allProducts = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: { ProductImage: { take: 2, select: { url: true } } },
      where: { gender: gender },
    });

    const totalCount = await prisma.product.count({ where: { gender: gender } });
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
