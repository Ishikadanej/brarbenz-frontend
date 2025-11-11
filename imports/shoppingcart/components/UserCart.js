"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRemoveFromCart } from "../../../hooks/useDeleteItem";
import { useUpdateCart } from "../../../hooks/useUpdateCart";
import { useCart } from "../../../hooks/useCart";
import { useAuth } from "../../../hooks/useAuth";
import useCartStore from "../../../Zustand/cartStore";
import EmptyCart from "./EmptyCart";
import CartSkeleton from "./CartSkeleton";
import styled from "styled-components";

const UserCart = () => {
  const router = useRouter();
  const { refetch, data, isFetching, isLoading: cartLoading } = useCart();
  const { token } = useAuth();
  const { removeFromCart, isLoading } = useRemoveFromCart();
  const { updateCartMutation, isPending: isCartPending } = useUpdateCart();
  const [cartItems, setCartItems] = useState([]);
  const { count, setCount } = useCartStore();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const sortedData = [...data].sort((a, b) => a.id - b.id);
      setCartItems(sortedData);
    } else {
      setCartItems([]);
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      refetch();
    } else {
      setCartItems([]);
    }
  }, [token]);

  useEffect(() => {
    const itemsArray = Array.isArray(cartItems) ? cartItems : [];
    const count = itemsArray.reduce((total, item) => total + item.quantity, 0);
    setCount(count);
  }, [cartItems]);

  const increaseUserQuantity = (cartId) => {
    const currentItem = cartItems.find((item) => item.id === cartId);
    if (!currentItem) return;

    const newQuantity = currentItem.quantity + 1;

    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );

    updateCartMutation(
      { cartId, quantity: newQuantity },
      {
        onSuccess: () => {
          // refetch();
        },
        onError: (error) => {
          toast.error(error?.message || "Update failed");
        },
      }
    );
  };

  const decreaseUserQuantity = (cartId) => {
    const currentItem = cartItems.find((item) => item.id === cartId);
    if (!currentItem) return;
    const productID = currentItem?.product?.id;

    if (currentItem.quantity === 1) {
      handleRemoveItem(productID);
      return;
    }

    const newQuantity = currentItem.quantity - 1;

    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );

    updateCartMutation(
      { cartId, quantity: newQuantity },
      {
        onSuccess: () => {
          // refetch();
        },
        onError: (error) => {
          toast.error(error?.message || "Update failed");
        },
      }
    );
  };

  const handleImageClick = (id) => {
    router.push(`/shop/${id}`);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  if (cartLoading || isFetching) {
    return <CartSkeleton />;
  }
  const isEmpty = !cartItems || cartItems.length === 0;

  return (
    <>
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <div>
          <Section>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="d-none d-md-block">
                    <div className="table-content table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="product-thumbnail">Images</th>
                            <th className="cart-product-name">Product</th>
                            <th className="product-price">Unit Price</th>
                            <th className="product-quantity">Quantity</th>
                            <th className="product-subtotal">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={`${item.id}-${item.size}`}>
                              <td
                                className="product-thumbnail"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleImageClick(item.product.id)
                                }
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    handleImageClick(item.product.id);
                                  }
                                }}
                              >
                                <img
                                  src={item.product?.imageUrl}
                                  alt={item.product?.title}
                                  style={{ width: "80px" }}
                                />
                              </td>
                              <td className="product-name">
                                {item.product?.title}
                              </td>
                              <td className="product-price">
                                <span className="amount">₹{item.price}</span>
                              </td>
                              <td className="product-quantity">
                                <div className="cart-plus-minus mb-sm-3 me-sm-3 mb-1 me-1">
                                  {/* Decrease Button */}
                                  <button
                                    className="qtybutton dec"
                                    onClick={() => {
                                      decreaseUserQuantity(item.id);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    -
                                  </button>

                                  <input
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                    className="fs-6"
                                  />

                                  {/* Increase Button */}
                                  <button
                                    className="qtybutton inc"
                                    onClick={() => {
                                      increaseUserQuantity(item.id);
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>

                              <td className="product-subtotal">
                                <span className="amount">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="d-md-none">
                    <div className="mobile-cart-items">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.id}-${item.size}`}
                          className="mobile-cart-item"
                        >
                          <div className="row">
                            <div className="col-sm-3 pr-0 col-5">
                              <div
                                className="mobile-product-image"
                                onClick={() =>
                                  handleImageClick(item.product.id)
                                }
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    handleImageClick(item.product.id);
                                  }
                                }}
                              >
                                <div
                                  style={{
                                    backgroundImage: `url(${item.product?.imageUrl})`,
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col-sm-9 col-7">
                              <div className="mobile-product-details position-relative">
                                <button
                                  type="button"
                                  className="mobile-remove-btn  rounded-4 border-0 end-0 top-0  position-absolute"
                                  onClick={() =>
                                    handleRemoveItem(item.product.id)
                                  }
                                  aria-label="Remove item"
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                                <div>
                                  <h6 className="mobile-product-title mb-0">
                                    {item.product?.title}
                                  </h6>
                                  <p className="mobile-product-price mb-0">
                                    Price: ₹{item.price}
                                  </p>
                                  <div className="mobile-product-total mt-2">
                                    Total: ₹
                                    {(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                                <div className="quantity-controls">
                                  <div className="cart-plus-minus ">
                                    <span
                                      className="qtybutton dec"
                                      onClick={() =>
                                        decreaseUserQuantity(item.id)
                                      }
                                      style={{
                                        cursor:
                                          item.quantity === 1
                                            ? "not-allowed"
                                            : "pointer",
                                      }}
                                    >
                                      -
                                    </span>
                                    <input
                                      type="text"
                                      value={item.quantity}
                                      readOnly
                                      className="py-sm-2 py-1 fs-6"
                                    />
                                    <span
                                      className="qtybutton inc"
                                      onClick={() =>
                                        increaseUserQuantity(item.id)
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cart Totals */}
                  <div className="row">
                    <div className="col-md-5 ml-auto">
                      <div className="cart-page-total">
                        <h2>Cart totals</h2>
                        <ul className="mb-20">
                          <li>
                            Subtotal <span>${subtotal.toFixed(2)}</span>
                          </li>
                          {/* <li>
                            Total <span>${subtotal.toFixed(2)}</span>
                          </li> */}
                        </ul>
                        <button
                          className="bt-btn "
                          onClick={() => router.push("/checkout")}
                          disabled={cartItems.length === 0}
                        >
                          Proceed to checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      )}
    </>
  );
};

export default UserCart;
const Section = styled.div`
padding-top: 70px;
padding-bottom: 70px;
@media (max-width: 575px) {
  padding-top: 40px;
  padding-bottom: 40px;
}
`;