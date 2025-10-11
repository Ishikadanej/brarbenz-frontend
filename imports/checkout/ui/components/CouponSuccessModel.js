"use client";
import React, { useState, useEffect } from "react";

const CouponSuccessModal = ({
  isOpen,
  onClose,
  couponCode,
  discountAmount,
}) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen && !show) return null;

  return (
    <div
      className={`modal fade ${show ? "show" : "hide"}`}
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
      tabIndex="-1"
      role="dialog"
      onClick={handleClose}
    >
      <div className="success-popup-overlay">
        <div
          className={`coupon-popup text-center p-4 ${
            show ? "animate-in" : "animate-out"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            className="modal-title mb-2"
            style={{ color: "#3e976c", fontSize: "20px", fontWeight: "700" }}
          >
            Awesome! 🎉
          </p>
          <div className="modal-body">
            <img
              src="/img/shop/gift-box.png"
              alt="Gift"
              className="wishlist-img"
              style={{
                width: "80px",
                height: "auto",
              }}
            />
            <p
              className="text-lg font-bold my-3"
              style={{
                fontSize: "26px",
                color: "#5A5A5A",
                marginTop: "16px",
                marginBottom: " 8px",
                fontWeight: "bold",
              }}
            >
              ₹{discountAmount} Saved
            </p>
            <p
              className="text-gray-600 mb-6  mb-0 "
              style={{ fontSize: "14px", lineHeight: "1.5" }}
            >
              Your <strong>'{couponCode}'</strong> coupon has been successfully
              applied!
            </p>
          </div>

          <button
            onClick={handleClose}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontWeight: "bold",
              fontSize: "20px",
              color: "#3e976c",
            }}
          >
            Yay, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponSuccessModal;
