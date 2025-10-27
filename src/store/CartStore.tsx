import { CartItemType, CartStoreStateType, CarStoreActionsType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CarStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (product: CartItemType) =>
        set((state: { cart: any }) => {
          const existingIndex: number = state.cart.findIndex(
            (p: any) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor
          );
          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return { cart: updatedCart };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity || 1,
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor,
              },
            ],
          };
        }),
      removeFromCart: (product: {
        selectedColor: any;
        selectedSize: any;
        id: string | number;
      }) =>
        set((state: { cart: any[] }) => ({
          cart: state.cart.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectedSize === product.selectedSize &&
                p.selectedColor === product.selectedColor
              )
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useCartStore;
