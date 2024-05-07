"use server";

import { CLOUDINARY_FOLDER } from "@/constants/CloudinaryFolder.const";
import { cloudinaryInstance } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    await cloudinaryInstance.uploader.destroy(`${CLOUDINARY_FOLDER}/${imageName}`);
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
