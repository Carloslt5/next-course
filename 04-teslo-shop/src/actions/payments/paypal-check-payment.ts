"use server";

import { PaypalStatusOrderResponse } from "@/interfaces/paypal.type";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPayPalBearerToken();
  if (!authToken) {
    return {
      status: false,
      message: "Can not get Auth Token",
    };
  }

  const resp = await verifyPaypalPayment(transactionId, authToken);
  if (!resp) {
    return {
      status: false,
      message: "Error verify payment",
    };
  }

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];
  if (status !== "COMPLETED") {
    return {
      status: false,
      message: "The order has not yet been paid in PayPal",
    };
  }

  try {
    console.log({ status, purchase_units });
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    return {
      status: false,
      message: "Error in payment",
    };
  }
  revalidatePath(`/orders/${orderId}`);
  return {
    status: true,
  };
};

// Generate Oauth Token from Paypal
const getPayPalBearerToken = async (): Promise<string | null> => {
  const base64Token = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(process.env.PAYPAL_OAUTH_URL ?? "", {
      ...requestOptions,
      cache: "no-store",
    }).then((response) => response.json());
    return response.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Verify order payment
const verifyPaypalPayment = async (
  transactionId: string,
  bearerToken: string
): Promise<PaypalStatusOrderResponse | null> => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
      ...requestOptions,
      cache: "no-store",
    }).then((response) => response.json());
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
