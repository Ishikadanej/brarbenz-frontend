"use client";
import { useQuery } from "@tanstack/react-query";
import { client, PRODUCTS_QUERY } from "../lib/sanity";

const getProducts = async () => {
  try {
    const data = await client.fetch(PRODUCTS_QUERY);
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const useProducts = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
