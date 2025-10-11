"use client";

import { login, me } from "../imports/login/api/api";
import { register } from "../imports/register/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuthStore from "../Zustand/useAuthStore";
import { useEffect } from "react";
import { mergeGuestCart } from "../imports/sidecart/utils";

export const useAuth = (onAuthSuccess) => {
  const router = useRouter();
  const { setUser, user, token, setToken, logout } = useAuthStore();

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: () => me(token),
    enabled: !!token && !user,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (userData && token) {
      setUser(userData);
    }
  }, [userData, token, user, setUser]);

  useEffect(() => {
    if (userError) {
      console.error("Failed to fetch profile:", userError);
      logout();
    }
  }, [userError, logout]);

  const {
    mutate: loginMutation,
    error: loginError,
    isPending: isLoginPending,
  } = useMutation({
    mutationFn: (formData) => login(formData),
    onSuccess: async (data) => {
      if (data.token) {
        setToken(data.token);
        if (data.user) {
          await mergeGuestCart(data.user, data.token);
        }
      }
      toast.success("Login successful!", { autoClose: 1000 });
      localStorage.removeItem("guest-cart");
      if (onAuthSuccess) onAuthSuccess(data);
    },
    onError: (error) => {
      console.log(error?.message);
      // toast.error(error?.message || "Login failed!");
    },
  });

  const {
    mutate: registerMutation,
    error: registerError,
    isPending: isRegisterPending,
  } = useMutation({
    mutationFn: (formData) => register(formData),
    onSuccess: async (data, variables) => {
      const { fromCheckout, cart } = variables;

      if (data.token) {
        setToken(data.token);
        if (data) {
          await mergeGuestCart(data, data.token);
        }
      }

      toast.success("Registration successful!");
      localStorage.removeItem("guest-cart");
      if (onAuthSuccess) onAuthSuccess(data);

      setTimeout(() => {
        if (fromCheckout && cart && cart.length > 0) {
          router.push("/checkout");
        } else {
          router.push("/");
        }
      }, 500);
    },
    onError: (error) => {
      toast.error(error?.message || "Registration failed!");
    },
  });

  return {
    loginMutation,
    isLoginPending,
    loginError,
    registerMutation,
    isRegisterPending,
    registerError,
    user,
    token,
    logout,
    isUserLoading,
    refetchUser,
  };
};
