"use client";

import { useAddressStore } from "@/stores/address/address-store";
import { useCartStore } from "@/stores/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const address = useAddressStore((state) => state.address);
  const { subTotal, tax, total } = useCartStore((state) => state.getSummaryInfomation());
  const totalItems = useCartStore((state) => state.getTotalItems());
  const cart = useCartStore((state) => state.cart);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const products = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    console.log({ address, products });
    setIsPlacingOrder(false);
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-md p-4 gap-10">
      <div>
        <h2 className="mb-2 text-2xl font-bold">Delivery address</h2>
        <article>
          <p className="text-2xl">
            {address.name} {address.lastName}
          </p>
          <p>{address.address}</p>
          <p>{address.city}</p>
          <p>
            {address.city}, {address.country}
          </p>
          <p>{address.zipCode}</p>
          <p>{address.phone}</p>
        </article>
      </div>
      <hr />
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
      <div>
        {/* <p className="text-red-500 ">Error creating order</p> */}
        <button
          // href={"/orders/123"}
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disable": isPlacingOrder,
          })}
        >
          Place order
        </button>
      </div>
    </div>
  );
};
