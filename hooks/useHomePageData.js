"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CATEGORIES_QUERY,
  client,
  HOME_CATS_WITH_PRODUCTS,
  HOMEPAGE_QUERY,
} from "../lib/sanity";

export const useHomepageData = () => {
  return useQuery({
    queryKey: ["homepage"],
    queryFn: async () => {
      const data = await client.fetch(HOMEPAGE_QUERY);
      return data;
    },
  });
};

export const useHomepageCategoriesData = () => {
  return useQuery({
    queryKey: ["homepagecategories"],
    queryFn: async () => {
      const data = await client.fetch(CATEGORIES_QUERY);
      return data;
    },
  });
};

export const useHomepageCategoriesWithProductData = () => {
  return useQuery({
    queryKey: ["homepagecategorieswithproduct"],
    queryFn: async () => {
      const data = await client.fetch(HOME_CATS_WITH_PRODUCTS);
      return data;
    },
  });
};
