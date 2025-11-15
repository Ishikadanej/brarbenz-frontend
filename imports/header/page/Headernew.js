"use client"
import React from "react";
import Header from "../components/Header";
import OfferStripe from "../components/OfferStripe";
import { usePathname } from "next/navigation";

const Headernew = () => {
  const pathname = usePathname();
  console.log("Current pathname:", pathname); 
  return (
    <div
      className="position-fixed top-0 start-0 w-100 bg-white"
      style={{ zIndex: 9999 }}
    >
    {pathname === '/' && <OfferStripe />}
      <Header />
    </div>
  );
};

export default Headernew;
