import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCart } from "../imports/shop/api/api";

export const useUpdateCart = () => {
  const {
    mutate: updateCartMutation,
    data,
    isLoading,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ cartId, quantity }) => {
      return updateCart(cartId, { quantity });
    },

    onSuccess: (response) => {
      //   toast.success("Cart updated successfully!");
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to update cart!");
    },
  });

  return {
    updateCartMutation,
    data,
    isLoading,
    error,
    isPending,
  };
};
