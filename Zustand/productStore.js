import { create } from "zustand";
const useProductsStore = create((set) => ({
  products: [],
  recentViews: [],
  page: 1,
  appliedCoupon: null,
  setAppliedCoupon: (couponId) => set({ appliedCoupon: couponId }),
  setPage: (page) => set({ page }),
  filterProducts: [],
  setFilterProducts: (products) => set({ filterProducts: products }),
  selectedCat: null,
  setSelectedCat: (cat) => set({ selectedCat: cat }),
  setRecentViews: (views) => set({ recentViews: views }),
  resetRecentViews: () => set({ recentViews: [] }),
  setProducts: (products) => set({ products }),
  selectedCoupon: null,
  setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),
}));

export default useProductsStore;
