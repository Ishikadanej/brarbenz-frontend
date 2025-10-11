"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import UserCart from "../components/UserCart";
import GuestCart from "../components/GuestCart";
import CartSkeleton from "../components/CartSkeleton";

const ShopingCartPage = () => {
  const { token } = useAuth();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <CartSkeleton />;
  }

  return <div>{token ? <UserCart /> : <GuestCart />}</div>;
};

export default ShopingCartPage;
