import { removeItemFromWishlist } from "../imports/shop/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromWishlist,
    isLoading,
    error,
    data,
  } = useMutation({
    mutationFn: removeItemFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to remove item");
    },
  });

  return { removeFromWishlist, isLoading, error, data };
};
