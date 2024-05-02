"use client";

import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PaypalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return <SkeletonPaypalButton />;
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `100.00`,
          },
        },
      ],
    });

    console.log("🚀 --------- transactionId", transactionId);
    return transactionId;
  };

  return <PayPalButtons createOrder={createOrder} />;
};

const SkeletonPaypalButton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-5">
      <div className="h-12 bg-gray-300 rounded" />
      <div className="h-12 bg-gray-300 rounded" />
    </div>
  );
};
