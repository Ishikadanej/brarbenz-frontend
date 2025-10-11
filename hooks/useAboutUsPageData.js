"use client";

import { useQuery } from "@tanstack/react-query";
import { ABOUTPAGE_QUERY, client } from "../lib/sanity";

export const useAboutUsPageData = () => {
  return useQuery({
    queryKey: ["aboutuspage"],
    queryFn: async () => {
      const data = await client.fetch(ABOUTPAGE_QUERY);
      return data;
    },
  });
};
