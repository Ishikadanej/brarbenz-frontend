"use client";
import { useQuery } from "@tanstack/react-query";
import { client, FILTER_BY_SIZE_QUERY } from "../lib/sanity";

const getSizeData = async (selectedSize) => {
  try {
    if (!selectedSize) return [];

    const sizedata = await client.fetch(FILTER_BY_SIZE_QUERY, {
      sizeTitle: selectedSize.trim(),
    });

    return sizedata;
  } catch (error) {
    console.error("Failed to fetch size data:", error);
    throw error;
  }
};

export const useSizes = (selectedSize) => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["productsBySize", selectedSize],
    queryFn: () => getSizeData(selectedSize),
    enabled: !!selectedSize,
  });

  return {
    sizes: data || [],
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
