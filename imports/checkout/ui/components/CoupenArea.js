"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BadgePercent, Check, TicketPercent } from "lucide-react";
import { useCoupon } from "../../../../hooks/useCoupon";
import { useCart } from "../../../../hooks/useCart";
import useProductsStore from "../../../../Zustand/productStore";
import { useRouter, useSearchParams } from "next/navigation";
import CouponSuccessModal from "./CouponSuccessModel";
import { cartOrderTotal } from "../../helpers/cartTotal";

const CouponArea = () => {
  const [showCoupons, setShowCoupons] = useState(false);
  const { appliedCoupon, setAppliedCoupon, selectedCoupon, setSelectedCoupon } =
    useProductsStore();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: couponResponse } = useCoupon();
  const coupons = couponResponse?.data || [];
  const activeCoupons = coupons.filter((coupon) => coupon.status === "active");

  const { cartTotal, discount } = cartOrderTotal(selectedCoupon);

  useEffect(() => {
    const couponId = searchParams.get("coupon");
    if (couponId && coupons.length > 0) {
      const exists = coupons.find((c) => String(c.id) === String(couponId));
      if (exists) {
        setAppliedCoupon(couponId);
        setSelectedCoupon(exists);
      }
    }
  }, [searchParams, coupons, setAppliedCoupon]);

  const handleApplyCoupon = (couponId) => {
    setAppliedCoupon(couponId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("coupon", couponId);
    router.push(`?${params.toString()}`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("coupon");
    router.push(`?${params.toString()}`);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  const CouponCard = ({ coupon }) => {
    const couponIdFromUrl = searchParams.get("coupon");
    const isActive =
      appliedCoupon === coupon.id ||
      String(couponIdFromUrl) === String(coupon.id);

    const isEligible = cartTotal > coupon.maxDiscountAmount;

    return (
      <div>
        <div
          className={`p-3 me-2 d-flex justify-content-between flex-row align-items-start coupon-card ${
            isActive ? "active-coupon" : "border"
          }`}
          style={{
            borderRadius: "8px",
            minHeight: "90px",
            maxWidth: "500px",
          }}
        >
          <div className="d-flex align-items-start gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "28px",
                height: "28px",
                background: isActive ? "#e6f7ec" : "white",
                color: "#28a745",
                fontSize: "16px",
              }}
            >
              {isActive ? <Check size={18} /> : <BadgePercent size={20} />}
            </div>
            <div>
              <p
                className={`mb-1 fw-bold ${
                  isActive ? "text-success" : "text-dark"
                }`}
              >
                {coupon.code} - {coupon.discountPercentage}% off
              </p>
              <small className="text-muted">
                Get flat {coupon.discountPercentage}% off on orders above{" "}
                {coupon.maxDiscountAmount}
              </small>
            </div>
          </div>

          {isActive ? (
            <button
              className="btn btn-link text-decoration-none text-danger p-0"
              onClick={handleRemoveCoupon}
              style={{ fontSize: "14px" }}
            >
              Remove
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-success apply-btn"
              onClick={() => {
                handleApplyCoupon(coupon.id);
                setIsCouponModalOpen(true);
              }}
              disabled={!isEligible}
            >
              {" "}
              Apply
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="coupon-area pt-100 pb-30">
      <div className="container">
        <div className="coupon-accordion col-lg-6 px-0 col-12">
          <h3>
            <TicketPercent size={20} />

            <span className="d-flex justify-content-between w-100">
              Have a coupon?{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "#3e976c",
                  textDecoration: "underline",
                }}
                onClick={() => setShowCoupons(!showCoupons)}
              >
                Apply Coupon
              </span>
            </span>
          </h3>

          {showCoupons && (
            <div className="coupon-info mt-3">
              {activeCoupons.length === 0 ? (
                <p className="text-muted text-center">No coupons available.</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  <Slider {...settings} style={{ padding: "0px 0px" }}>
                    {activeCoupons.map((coupon) => (
                      <CouponCard key={coupon.id} coupon={coupon} />
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <CouponSuccessModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        couponCode={selectedCoupon?.code}
        discountAmount={discount.toFixed(2)}
      />
      <style jsx>{`
        :global(.slick-list) {
          padding: 0px 0px !important;
        }
      `}</style>
    </section>
  );
};

export default CouponArea;
