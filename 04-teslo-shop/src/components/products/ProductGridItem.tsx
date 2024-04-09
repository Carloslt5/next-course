import { Product } from "@/interfaces/product.type";
import Image from "next/image";
import Link from "next/link";

type ProductGridItemProps = {
  product: Product;
};
export const ProductGridItem = ({ product }: ProductGridItemProps) => {
  return (
    <div className="rounded-md overflow-hidden fade-in flex flex-col">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          className="w-full object-cover"
          width={500}
          height={500}
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
