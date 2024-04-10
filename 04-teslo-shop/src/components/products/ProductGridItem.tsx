"use client";
import { Product } from "@/interfaces/product.type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductGridItemProps = {
  product: Product;
};
export const ProductGridItem = ({ product }: ProductGridItemProps) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in flex flex-col">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded-md"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
          priority
        />
      </Link>

      <div className="p-4 flex flex-col h-full">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600">
          {product.title}
        </Link>
        <span className="font-bold mt-auto">${product.price}</span>
      </div>
    </div>
  );
};
