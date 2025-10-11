import { useQuery } from "@tanstack/react-query";
import { getCoupon } from "../imports/checkout/api/api";

export const useCoupon = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getCoupon(),
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
