"use client";

import { setTransactionId } from "@/actions/payments/set-transaction.id";
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: PaypalButtonProps) => {
  const roundedAmount = Math.round(amount * 100) / 100;
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
            value: `${roundedAmount}`,
          },
        },
      ],
    });

    const { status } = await setTransactionId(orderId, transactionId);
    if (!status) {
      throw new Error("Can not update order");
    }

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
