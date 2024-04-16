import { type CartProduct } from "@/interfaces/product.type";
import { create } from "zustand";

type State = {
  cart: CartProduct[];

  // addProductToCart
  // updateProductToCart
  // removeProduct
};

export const useCartStore = create<State>()((set) => ({
  cart: [],
}));
