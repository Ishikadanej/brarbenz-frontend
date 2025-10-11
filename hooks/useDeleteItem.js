import { removeItemFromCart } from "../imports/shop/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromCart,
    isLoading,
    error,
    data,
  } = useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to remove item");
    },
  });

  return { removeFromCart, isLoading, error, data };
};
