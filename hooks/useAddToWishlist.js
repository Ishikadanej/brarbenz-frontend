import { addToWishlist } from "../imports/shop/api/api";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const useAddToWishlist = () => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  const {
    mutate: addToWishlistMutation,
    data,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (product) => addToWishlist(product, token),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add Wishlist!");
    },
  });

  return { addToWishlistMutation, data, isLoading, error };
};
