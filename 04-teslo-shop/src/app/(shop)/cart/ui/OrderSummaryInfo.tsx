"use client";
import { useCartStore } from "@/stores/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useEffect, useState } from "react";

export const OrderSummaryInfo = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, total } = useCartStore((state) => state.getSummaryInfomation());
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Order Summary</h2>
      <article className="grid grid-cols-2">
        <span>Product Nº</span>
        <span className="text-right">{totalItems} items</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Taxes 15%</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 font-bold text-xl ">Total:</span>
        <span className="mt-5 font-bold text-xl text-right">{currencyFormat(total)}</span>
      </article>
    </div>
  );
};
