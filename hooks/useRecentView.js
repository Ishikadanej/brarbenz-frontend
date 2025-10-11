import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getRecentViewsApi } from "../imports/shop/api/api";

export const useRecentView = () => {
  const token = Cookies.get("token");

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["recentView"],
    queryFn: getRecentViewsApi,
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
