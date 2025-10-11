import { addToCartApi } from "../imports/shop/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const useAddToCart = () => {
  const token = Cookies.get("token");

  const {
    mutate: addToCartMutation,
    data,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (product) => addToCartApi(product, token),
    onSuccess: (response) => {
      // toast.success("Added to cart successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add to cart!");
    },
  });

  return { addToCartMutation, data, isLoading, error };
};
