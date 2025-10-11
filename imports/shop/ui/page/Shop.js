"use client";

import dynamic from "next/dynamic";

const ShopHero = dynamic(() => import("../components/ShopHero"));

const Shop = () => {
  return (
    <div>
      <ShopHero />
    </div>
  );
};

export default Shop;
