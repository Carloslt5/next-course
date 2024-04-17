import { type CartProduct } from "@/interfaces/product.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  // updateProductToCart
  // removeProduct
};

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updateProductInCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updateProductInCart });
      },
    }),
    { name: "shopping-cart" }
  )
);
