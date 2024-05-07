"use server";

import { CLOUDINARY_FOLDER } from "@/constants/CloudinaryFolder.const";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      status: false,
      error: "Can not delete images from FileSystem",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
  console.log("🚀 --------- imageName", imageName);

  try {
    await cloudinary.uploader.destroy(`${CLOUDINARY_FOLDER}/${imageName}`);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Can not delete image",
    };
  }
};
