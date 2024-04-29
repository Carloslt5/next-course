"use client";
import { useCartStore } from "@/stores/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SkeletonProdutsInCart } from "../cart/SkeletonProdutsInCart";

export const ProductsInCartCheckout = () => {
  const productInCart = useCartStore((state) => state.cart);
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
            <Image
              src={`/products/${product.image}`}
              width={120}
              height={120}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt={product.title}
              className="rounded-md"
              priority
            />
          </figure>

          <article className="w-2/3">
            <p>{product.title}</p>
            <p>
              Size: {product.size} ({product.quantity})
            </p>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
          </article>
        </div>
      ))}
    </>
  );
};
