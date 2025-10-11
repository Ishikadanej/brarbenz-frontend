import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../imports/account/api/api";
import Cookies from "js-cookie";

export const useOrder = () => {
  const token = Cookies.get("token");

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => getOrders(token),
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
