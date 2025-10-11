import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      cartCount: 0,
      isCartOpen: false,
      wishlist: [],
      wishlistCount: 0,
      count: 0,
      isLoading: false,
      isHydrated: false,
      setCount: (count) => set(() => ({ count })),
      setLoading: (loading) => set({ isLoading: loading }),

      setCart: (cartItems) =>
        set(() => {
          const items = Array.isArray(cartItems) ? cartItems : [];
          const updatedCount = items.reduce(
            (total, item) => total + item.quantity,
            0
          );
          return { cart: items, cartCount: updatedCount };
        }),

      setCartCount: (count) =>
        set(() => ({
          cartCount: count >= 0 ? count : 0,
        })),

      setWishlist: (wishlistItems) =>
        set(() => {
          const items = Array.isArray(wishlistItems) ? wishlistItems : [];
          const updatedCount = items.reduce(
            (total, item) => total + (item.quantity || 1),
            0
          );
          return { wishlist: items, wishlistCount: updatedCount };
        }),

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.id === product.id && item.size === product.size
          );

          let updatedCart;
          if (existing) {
            updatedCart = state.cart.map((item) =>
              item.id === product.id && item.size === product.size
                ? { ...item, quantity: item.quantity + product.quantity }
                : item
            );
          } else {
            updatedCart = [...state.cart, { ...product }];
          }

          const updatedCount = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );

          return {
            cart: updatedCart,
            cartCount: updatedCount,
          };
        }),

      removeFromCarts: (id, size) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => !(item.id === id && item.size === size)
          );

          const updatedCount = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );

          return {
            cart: updatedCart,
            cartCount: updatedCount,
          };
        }),

      increaseQuantity: (productId, size) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.id === productId && item.size === size
          );

          let updatedCart;

          if (existing) {
            updatedCart = state.cart.map((item) =>
              item.id === productId && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            updatedCart = [
              ...state.cart,
              {
                id: productId,
                size: size,
                quantity: 1,
              },
            ];
          }

          const updatedCount = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );

          return {
            cart: updatedCart,
            cartCount: updatedCount,
          };
        }),

      decreaseQuantity: (productId, size) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.id === productId && item.size === size
          );

          let updatedCart;

          if (existing) {
            updatedCart = state.cart.map((item) =>
              item.id === productId && item.size === size
                ? {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                  }
                : item
            );
          } else {
            updatedCart = [...state.cart];
          }

          const updatedCount = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );

          return {
            cart: updatedCart,
            cartCount: updatedCount,
          };
        }),

      resetCart: () =>
        set({ cart: [], cartCount: 0, wishlist: [], wishlistCount: 0 }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: "guest-cart",
      getStorage: () => localStorage,
      partialize: (state) => ({
        cart: state.cart,
        cartCount: state.cartCount,
      }),
      onRehydrateStorage: () => (state) => {
        console.log("Cart store rehydrated from storage.");
        set({ isHydrated: true });
      },
    }
  )
);

export default useCartStore;
