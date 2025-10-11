"use client";
import React, { useState, useEffect } from "react";
import CoupenArea from "../components/CoupenArea";
import CheckoutArea from "../components/CheckoutArea";
import { useAuth } from "../../../../hooks/useAuth";
import Cookies from "js-cookie";
import LoginPopup from "../components/LoginPopup";

const Checkout = () => {
  const { user } = useAuth();
  const token = Cookies.get("token");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!token) {
      setShowLoginPopup(true);
    } else {
      setShowLoginPopup(false);
    }
  }, [user, token]);

  return (
    <div>
      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} />
      )}
      <>
        <CoupenArea />
        <CheckoutArea />
      </>
    </div>
  );
};

export default Checkout;
