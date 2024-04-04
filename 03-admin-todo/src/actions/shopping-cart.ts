"use client";

import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCartString = getCookie("cart") as string;
    const cookieCart = JSON.parse(cookieCartString) as { [id: string]: number };
    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductToCart = (id: string) => {
  const cookieCart = getCookieCart();
  delete cookieCart[id];
  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeSigleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (!cookieCart[id]) return;

  const itemsInCart = cookieCart[id] - 1;
  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};
