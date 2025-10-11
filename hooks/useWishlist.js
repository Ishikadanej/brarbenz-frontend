import { getWishlistProducts } from "../imports/shop/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useCartStore from "../Zustand/cartStore";
import { useAuth } from "./useAuth";

export const useWishlist = (userId) => {
  const { user, token } = useAuth();
  const { setWishlist } = useCartStore();

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: async () => getWishlistProducts(user?.id, token),
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setWishlist(data);
    }
  }, [data, setWishlist]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
