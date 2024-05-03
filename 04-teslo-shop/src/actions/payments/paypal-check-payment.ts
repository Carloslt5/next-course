"use server";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPayPalBearerToken();
  console.log("🚀 --------- authToken", authToken);
  if (!authToken) {
    return {
      status: false,
      message: "Can not get Auth Token",
    };
  }
  return;
};

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
