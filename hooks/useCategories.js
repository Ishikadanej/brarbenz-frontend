"use client";
import { useQuery } from "@tanstack/react-query";
import { client, ALL_HOME_CATEGORIES_WITH_PRODUCTS } from "../lib/sanity";

const getCategories = async () => {
  try {
    const categoriesData = await client.fetch(
      ALL_HOME_CATEGORIES_WITH_PRODUCTS
    );

    return categoriesData.map((cat) => ({
      products: cat.products,
      title: cat.title,
      count: cat.products?.length || 0,
    }));
  } catch (error) {
    console.error("Failed to fetch products or categories:", error);
    throw error;
  }
};

export const useCategories = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["productsCategories"],
    queryFn: getCategories,
  });

  return {
    categories: data || [],
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
