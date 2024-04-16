"use client";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { SizeSelector } from "@/components/product/SizeSelector";
import { Product, Size } from "@/interfaces/product.type";
import { useState } from "react";

type AddToCartProps = {
  product: Product;
};

export const AddToCart = ({ product }: AddToCartProps) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log({ size, quantity });
  };

  return (
    <>
      {posted && !size && <p className="text-s, text-red-500">You need select size</p>}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSelectedSize={(size) => setSize(size)}
      />
      <QuantitySelector
        quantity={quantity}
        onSelectedQuantity={(quantity) => setQuantity(quantity)}
      />
      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};
