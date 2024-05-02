"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PaypalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="animate-pulse flex flex-col gap-5">
        <div className="h-12 bg-gray-300 rounded" />
        <div className="h-12 bg-gray-300 rounded" />
      </div>
    );
  }

  return <PayPalButtons />;
};
