import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
        );

        if (productInState) {
          const updateProducts = products.map((product) =>
            product.id === productInState.id &&
            product.optionTitle === productInState.optionTitle
              ? {
                  ...product,
                  quantity: product.quantity + item.quantity,
                  price: product.price + item.price,
                }
              : product
          );

          set((state) => ({
            products: updateProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },

      removeFromCart(item) {
        const products = get().products.filter(
          (product) => product.optionTitle !== item.optionTitle
        );

        set((state) => ({
          products,
          totalItems: Math.max(state.totalItems - item.quantity, 0),
          totalPrice: Math.max(state.totalPrice - item.price, 0),
        }));
      },

      removeAllItem() {
        set(() => ({
          products: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
