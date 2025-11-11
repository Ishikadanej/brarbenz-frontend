import React from "react";
import useCartStore from "../../../Zustand/cartStore";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";
import styled from "styled-components";

const GuestCart = () => {
  const router = useRouter();
  const { increaseQuantity, decreaseQuantity, removeFromCarts, cart } =
    useCartStore();

  const handleImageClick = (id) => {
    router.push(`/shop/${id}`);
  };
  const isEmpty = !cart || cart.length === 0;

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                          {cart.map((item) => (
                            <tr key={`${item.id}-${item.size}`}>
                              <td
                                className="product-thumbnail"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleImageClick(item.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    handleImageClick(item.id);
                                  }
                                }}
                              >
                                <img
                                  src={item.images?.[0]?.asset?.url}
                                  alt={item.title}
                                  style={{ width: "80px" }}
                                />
                              </td>
                              <td className="product-name">{item.title}</td>
                              <td className="product-price">
                                <span className="amount">₹{item.price}</span>
                              </td>
                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <span
                                    className="qtybutton dec"
                                    onClick={() => {
                                      if (item.quantity === 1) {
                                        removeFromCarts(item.id, item.size);
                                      } else {
                                        decreaseQuantity(item.id, item.size);
                                      }
                                    }}
                                  >
                                    -
                                  </span>

                                  <input
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <span
                                    className="qtybutton inc"
                                    onClick={() => {
                                      increaseQuantity(item.id, item.size);
                                    }}
                                  >
                                    +
                                  </span>
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
                    {
                      <div className="mobile-cart-items">
                        {cart.map((item) => (
                          <div
                            key={`${item.id}-${item.size}`}
                            className="mobile-cart-item"
                          >
                            <div className="row">
                              <div className="col-sm-3 pr-0 col-5">
                                <div
                                  className="mobile-product-image"
                                  onClick={() => handleImageClick(item.id)}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      handleImageClick(item.id);
                                    }
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundImage: `url(${item.images?.[0]?.asset?.url})`,
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="col-sm-9 col-7">
                                <div className="mobile-product-details position-relative">
                                  <button
                                    type="button"
                                    className="mobile-remove-btn  rounded-4 border-0 end-0 top-0  position-absolute"
                                    onClick={() => {
                                      removeFromCarts(item.id, item.size);
                                    }}
                                    aria-label="Remove item"
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                  <div>
                                    <h6 className="mobile-product-title mb-0">
                                      {item.title}
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
                                        onClick={() => {
                                          decreaseQuantity(item.id, item.size);
                                        }}
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
                                        onClick={() => {
                                          increaseQuantity(item.id, item.size);
                                        }}
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
                    }
                  </div>

                  <div className="row">
                    <div className="col-md-5 ml-auto">
                      <div className="cart-page-total">
                        <h2>Cart totals</h2>
                        <ul className="mb-20">
                          <li>
                            Subtotal <span>₹{subtotal.toFixed(2)}</span>
                          </li>
                        </ul>
                        <button
                          className="bt-btn "
                          onClick={() => router.push("/checkout")}
                          disabled={cart.length === 0}
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

export default GuestCart;


const Section = styled.div`
padding-top: 70px;
padding-bottom: 70px;
@media (max-width: 575px) {
  padding-top: 50px;
  padding-bottom: 50px;
}
`;