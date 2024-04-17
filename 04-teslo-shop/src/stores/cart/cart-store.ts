import { type CartProduct } from "@/interfaces/product.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  cart: CartProduct[];

  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductToCart: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
};

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
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
      updateProductToCart: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedProductToCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updatedProductToCart });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const deletedProductToCart = cart.filter((item) => {
          return item.id !== product.id || item.size !== product.size;
        });
        set({ cart: deletedProductToCart });
      },
    }),
    { name: "shopping-cart" }
  )
);
