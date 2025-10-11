
"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../component/HeroSection";
import Categories from "../component/Categories";
import FeatureProduct from "../component/FeatureProduct";
import TrendingProduct from "../component/TrendingProduct";
import CountDown from "../component/CountDown";
import BestSellingProducts from "../component/BestSellingProducts";
import TopFeaturePro from "../component/TopFeaturePro";
import Discover from "../component/Discover";
import CategoryProducts from "../component/CategoryProducts";
import useProductsStore from "../../../Zustand/productStore";
import FeatureProductSkeleton from "../component/FeatureProductSkeleton";

const Homenew = ({ data, productData, categoriesWithProducts, categories }) => {
  const { setProducts } = useProductsStore();

  useEffect(() => {
    setProducts(productData?.[0]?.products || []);
  }, []);

  return (
    <div>
      <HeroSection data={data} />
      <Categories categories={categories} />
      <CategoryProducts categoriesWithProducts={categoriesWithProducts} />
      <FeatureProduct data={data} />
      <TrendingProduct />
      <CountDown data={data} />
      <BestSellingProducts data={data} />
      <TopFeaturePro data={data} />
      <Discover data={data} />
    </div>
  );
};

export default Homenew;
