"use client";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { useCartStore } from "@/stores/cart/cart-store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductImage } from "../ui/ProductImage";
import { SkeletonProdutsInCart } from "./SkeletonProdutsInCart";

export const ProductsInCart = () => {
  const productInCart = useCartStore((state) => state.cart);
  const updateProductToCart = useCartStore((state) => state.updateProductToCart);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <SkeletonProdutsInCart />;
  }

  if (productInCart.length <= 0 && loaded) {
    redirect("/empty");
  }

  return (
    <>
      {productInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex flex-row gap-2">
          <figure className=" w-1/3 max-w-[100px] bg-white rounded-md overflow-hidden">
            <ProductImage
              src={product.image}
              width={120}
              height={120}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt={product.title}
              className="rounded-md"
              priority
            />
          </figure>

          <article className="w-2/3">
            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
              <p>{product.title}</p>
              <p>Size: {product.size}</p>
            </Link>
            <p className="font-bold">${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onSelectedQuantity={(quantity) => updateProductToCart(product, quantity)}
            />
            <button onClick={() => removeProduct(product)} className="text-red-900 underline">
              Remove
            </button>
          </article>
        </div>
      ))}
    </>
  );
};
