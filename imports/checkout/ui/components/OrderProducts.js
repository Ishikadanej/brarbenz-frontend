"use client";
import React, { useEffect, useState } from "react";
import { createOrder } from "../../api/api";
import { useCart } from "../../../../hooks/useCart";
import { useAuth } from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
import PaymentSuccess from "./PaymentSuccess";
import { useRouter, useSearchParams } from "next/navigation";
import { useCoupon } from "../../../../hooks/useCoupon";
import { cartOrderTotal } from "../../helpers/cartTotal";
import { sendOrderConfirmation } from "../../../../lib/helper";

const OrderProducts = ({ formData, setErrors }) => {
  const { user, token } = useAuth();
  const { data, refetch } = useCart();
  const { data: couponResponse } = useCoupon();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const { finalTotal, cartTotal, isFreeShipping, shippingCharge, discount } =
    cartOrderTotal(selectedCoupon);

  const coupons = couponResponse?.data || [];
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const couponId = searchParams.get("coupon");

    if (couponId && coupons.length > 0) {
      const foundCoupon = coupons.find(
        (c) => String(c.id) === String(couponId)
      );
      if (foundCoupon) {
        setSelectedCoupon(foundCoupon);
      } else {
        setSelectedCoupon(null);
      }
    } else {
      setSelectedCoupon(null);
    }

    if (searchParams.get("payment") === "success") {
      setIsSuccessModalOpen(true);
    }
  }, [searchParams, coupons]);

  const validatePlace = () => {
    if (user) {
      const isAddressesValid =
        Array.isArray(user.addresses) && user.addresses.length > 0;
      const isPhoneValid =
        typeof user.phone === "string" && user.phone.trim().length > 0;
      return isAddressesValid && isPhoneValid;
    }
    return false;
  };

  const handlePlaceOrder = async () => {
    try {
      if (!formData.selectedAddress || !formData.selectedAddress.Street) {
        setErrors((prev) => ({
          ...prev,
          global: "Please add billing details before placing an order.",
        }));
        return;
      }

      if (!data || data.length === 0) {
        setErrors((prev) => ({
          ...prev,
          global: "Your cart is empty.",
        }));
        return;
      }

      const productDetails = data.map((item) => ({
        id: item.product?.id?.toString(),
        price: item.product?.price?.toString(),
        quantity: item.quantity?.toString(),
        size: item.size,
        title: item.product?.title,
        imageUrl: item.product?.imageUrl,
      }));

      const orderData = {
        userId: user.id?.toString(),
        userDetails: {
          name: user.name,
          lastName: user.lastName || "",
          email: user.email,
          phone: user.phone,
          addresses: formData.selectedAddress,
        },
        productDetails,
        totalAmount: cartTotal,
        finalTotal: finalTotal,
        shippingCharge: shippingCharge,
        couponDiscount: discount,
        appliedCoupon: selectedCoupon ? selectedCoupon.id : null,
      };

      const res = await createOrder(orderData, token);
      refetch();

      if (!res.success) {
        toast.error("Order creation failed");
        return;
      }

      const options = {
        key: res.razorpayKey,
        amount: orderData.totalAmount * 100,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: res.razorpayOrderId,
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        handler: async function (response) {
          const verifyRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/order/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: res.orderId,
                userId: user.id,
              }),
            }
          );

          const verifyJson = await verifyRes.json();
          if (verifyJson.success) {
            await sendOrderConfirmation({
              userName: orderData.userDetails.name,
              userEmail: orderData.userDetails.email,
              userAddress: orderData.userDetails.addresses,
              id: res.orderId,
              finalTotal: orderData.finalTotal,
              productDetails: orderData.productDetails,
              shippingCharge: shippingCharge,
              couponDiscount: orderData.couponDiscount,
              totalAmount: orderData.totalAmount,
              productDetails,
            });
            router.push("./checkout");
            setIsSuccessModalOpen(true);
          } else {
            toast.error("Payment Verification Failed ");
          }
        },
        prefill: {
          name: orderData.userDetails.name,
          email: orderData.userDetails.email,
          contact: orderData.userDetails.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="your-order mb-30">
      <h3>Your order</h3>
      <div className="your-order-table table-responsive">
        <table>
          <thead>
            <tr>
              <th className="product-name fw-bold">Product</th>
              <th className="product-total fw-bold text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {!data || !Array.isArray(data) || data.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center">
                  Your cart is currently empty.
                </td>
              </tr>
            ) : (
              data.map((product) => {
                const productTotal =
                  product.total ??
                  (product.product?.price ?? 0) * (product.quantity ?? 1);

                return (
                  <tr className="cart_item" key={product.id}>
                    <td className="product-name d-flex align-items-center gap-2">
                      <img
                        src={product.product?.imageUrl}
                        style={{ width: "30px" }}
                        alt={product.product?.title}
                      />
                      {product.product?.title}
                      {product.size ? ` (${product.size.toUpperCase()})` : ""}
                      <strong className="product-quantity pe-2">
                        × {product.quantity}
                      </strong>
                    </td>
                    <td className="product-total text-end">
                      <span className="amount">₹{productTotal}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr className="cart-subtotal">
              <th>Cart Subtotal</th>
              <td className="text-end">
                <span className="amount">₹{cartTotal}</span>
              </td>
            </tr>
            {selectedCoupon && (
              <tr className="discount">
                <th>
                  Coupon ({selectedCoupon.code}){" "}
                  <small>-{selectedCoupon.discountPercentage}%</small>
                </th>
                <td className="text-end">
                  <span className="amount">-₹{discount.toFixed(2)}</span>
                </td>
              </tr>
            )}
            <tr className="shipping">
              <th>Shipping</th>
              <td className="d-flex justify-content-end">
                <div>
                  {isFreeShipping ? "Free Shipping" : `₹${shippingCharge}`}
                </div>
              </td>
            </tr>
            <tr className="order-total">
              <th>Order Total</th>
              <td className="text-end">
                <span className="amount">₹{finalTotal.toFixed(2)}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="order-button-payment mt-20">
        <button
          type="submit"
          className="bt-btn"
          onClick={handlePlaceOrder}
          disabled={!validatePlace()}
        >
          Place order
        </button>
        <PaymentSuccess
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default OrderProducts;
