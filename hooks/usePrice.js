"use client";
import { useQuery } from "@tanstack/react-query";
import { client, FILTER_PRICE_QUERY } from "../lib/sanity";

const getFilteredProductsByPrice = async ({ minPrice, maxPrice }) => {
  try {
    const products = await client.fetch(FILTER_PRICE_QUERY, {
      minPrice,
      maxPrice,
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch filtered products:", error);
    throw error;
  }
};

export const usePrice = (minPrice, maxPrice) => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["filteredProductsByPrice", minPrice, maxPrice],
    queryFn: () => getFilteredProductsByPrice({ minPrice, maxPrice }),
    enabled: true,
    keepPreviousData: true,
  });

  return {
    priceData: data || [],
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
