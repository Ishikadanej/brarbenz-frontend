"use client";
import React, { useEffect, useState } from "react";
import ProductInfo from "../components/ProductInfo";
import ProductDes from "../components/ProductDes";
import ProductArea from "../components/ProductArea";
import { useProducts } from "../../../hooks/useProduct";
import useProductsStore from "../../../Zustand/productStore";

const ProductDetail = ({ id }) => {
  const { data } = useProducts();
  const { setProducts } = useProductsStore();

  useEffect(() => {
    if (data) {
      setProducts(data?.[0]?.products || []);
    }
  }, [data, setProducts]);

  return (
    <div>
      <ProductInfo productId={id} />
      <ProductDes productId={id} />
      <ProductArea productId={id} />
    </div>
  );
};

export default ProductDetail;
