"use server";

import { PaypalStatusOrderResponse } from "@/interfaces/paypal.type";

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
  console.log("🚀 --------- status", { status, purchase_units });
  if (status !== "COMPLETED") {
    return {
      status: false,
      message: "The order has not yet been paid in PayPal",
    };
  }
  return;
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
    const response = await fetch(process.env.PAYPAL_OAUTH_URL ?? "", requestOptions).then(
      (response) => response.json()
    );
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
    const response = await fetch(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
      requestOptions
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
