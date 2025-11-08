
"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../component/HeroSection";

import useProductsStore from "../../../Zustand/productStore";

const Homenew = ({ data, productData, categoriesWithProducts, categories }) => {
  const { setProducts } = useProductsStore();

  useEffect(() => {
    setProducts(productData?.[0]?.products || []);
  }, []);

  return (
    <div>
      <HeroSection data={data} />

    </div>
  );
};

export default Homenew;
