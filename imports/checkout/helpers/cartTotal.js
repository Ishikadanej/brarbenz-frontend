import { useCart } from "../../../hooks/useCart";

export const cartOrderTotal = (selectedCoupon) => {
  const { data } = useCart();

  const cartTotal = Array.isArray(data)
    ? data.reduce((acc, item) => acc + (item.total ?? 0), 0)
    : 0;
  const isFreeShipping = cartTotal >= 500;

  const shippingCharge = isFreeShipping ? 0 : 60;
  const newOrderTotal = cartTotal + shippingCharge;

  const discount = selectedCoupon
    ? Math.min(
        (newOrderTotal * selectedCoupon.discountPercentage) / 100,
        selectedCoupon.maxDiscountAmount
      )
    : 0;

  const finalTotal = newOrderTotal - discount;

  return {
    cartTotal,
    isFreeShipping,
    shippingCharge,
    newOrderTotal,
    discount,
    finalTotal,
  };
};
