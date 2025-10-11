import { getCart } from "../imports/shop/api/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useCart = (userId) => {
  const { user, token } = useAuth();

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => getCart(user.id, token),
    enabled: !!user?.id && !!token,
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
