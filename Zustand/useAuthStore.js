import { create } from "zustand";
import Cookies from "js-cookie";
import useCartStore from "./cartStore";
import useProductsStore from "./productStore";

const useAuthStore = create((set) => ({
  token: Cookies.get("token") || null,
  user: null,
  isAuthenticated: !!Cookies.get("token"),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  setToken: (token) => {
    if (token) {
      Cookies.set("token", token);
    } else {
      Cookies.remove("token");
    }
    set({ token, isAuthenticated: !!token });
  },

  setUser: (user) => set({ user }),

  logout: async () => {
    set({ isLoading: true });

    setTimeout(() => {
      Cookies.remove("token");

      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      const cartStore = useCartStore.getState();
      const productStore = useProductsStore.getState();
      productStore.resetRecentViews();
      cartStore.resetCart();
      localStorage.clear();
    }, 1000);
  },
}));

export default useAuthStore;
