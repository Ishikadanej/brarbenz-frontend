"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "../../Zustand/cartStore";
import { useRemoveFromCart } from "../../hooks/useDeleteItem";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useUpdateCart } from "../../hooks/useUpdateCart";
import { toast } from "react-toastify";
import { Trash, X } from "lucide-react";
import { cartOrderTotal } from "../checkout/helpers/cartTotal";

const SideCart = () => {
  const isOpen = useCartStore((state) => state.isCartOpen);
  const onClose = useCartStore((state) => state.closeCart);
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    count,
    setCount,
    removeFromCarts,
  } = useCartStore();
  const { token } = useAuth();
  const { updateCartMutation, isPending: isCartPending } = useUpdateCart();
  const router = useRouter();
  const { removeFromCart, isLoading } = useRemoveFromCart();
  const { data, refetch } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const { cartTotal } = cartOrderTotal();

  useEffect(() => {
    if (data && Array.isArray(data) && token) {
      const sortedData = [...data].sort((a, b) => a.id - b.id);
      setCartItems(sortedData);
    } else {
      setCartItems([]);
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      refetch();
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
          refetch();
        },
        onError: (error) => {
          toast.error(error?.message || "Update failed");
        },
      }
    );
  };

  const decreaseUserQuantity = async (cartId) => {
    const currentItem = cartItems.find((item) => item.id === cartId);
    if (!currentItem || currentItem.quantity <= 1) return;

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
          refetch();
        },
        onError: (error) => {
          toast.error(error?.message || "Update failed");
        },
      }
    );
  };

  const TokenData = () => {
    // const subtotal = Array.isArray(data)
    //   ? data.reduce((total, item) => total + item.price * item.quantity, 0)
    //   : 0;

    return (
      <>
        <div>
          <div className="d-flex justify-content-between">
            <h2 className="side-cart-title">Shopping Cart</h2>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="cart-items ">
            {!cartItems ||
            !Array.isArray(cartItems) ||
            cartItems.length === 0 ? (
              <p className="empty-cart-msg d-flex justify-content-center">
                Your cart is currently empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="cart-item border-bottom position-relative"
                >
                  <button
                    className=" rounded-4 border-0 end-0 top-0 m-2   position-absolute  "
                    onClick={() => removeFromCart(item.product.id)}
                    style={{
                      zIndex: 1,
                      background: "transparent",
                    }}
                  >
                    <X size={18} />
                  </button>

                  <img
                    className="bg-image"
                    onClick={() => {
                      if (item.product.id) {
                        router.push(`/shop/${item.product.id}`);
                        onClose();
                      }
                    }}
                    style={{ cursor: "pointer" }}
                    src={item.product?.imageUrl}
                    aria-label={item.title}
                  />
                  <div className="item-details">
                    <p className="item-title fw-bold mb-0">
                      {item.product.title}
                    </p>
                    <p className="item-size mb-0 bg-body-secondary  rounded-1 text-center">
                      Size: {(item.size || "").toUpperCase()}
                    </p>
                    <div className="item-price d-flex flex-column flex-md-row align-items-md-center align-items-start justify-content-md-between justify-content-start">
                      ₹{Number(item.price || 0).toFixed(2)}
                    </div>
                    <div className="d-flex align-items-center gap-10">
                      <div className="cart-plus-minus me-sm-3 me-1">
                        <button
                          className="qtybutton dec"
                          onClick={() => {
                            decreaseUserQuantity(item.id);
                          }}
                          style={{
                            top: "2px",
                            cursor:
                              item.quantity === 1 ? "not-allowed" : "pointer",
                          }}
                        >
                          -
                        </button>

                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="fs-6 py-1 quantity-input"
                        />

                        <button
                          className="qtybutton inc"
                          onClick={() => {
                            increaseUserQuantity(item.id);
                          }}
                          style={{
                            top: "2px",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="cartTotalContainer">
            <hr className="horizontalLine" />
            <div className="subtotal">
              Subtotal <span>${cartTotal}</span>
            </div>
            <button
              className="bt-btn theme-btn w-100"
              onClick={() => {
                router.push("/checkout");
                onClose();
              }}
            >
              Checkout
            </button>
            <button
              className="cartButton my-4 d-flex justify-content-center"
              onClick={() => {
                router.push("/cart");
                onClose();
              }}
            >
              View cart
            </button>
          </div>
        )}
      </>
    );
  };

  const CartData = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return (
      <>
        <div>
          <div className="d-flex justify-content-between">
            <h2 className="side-cart-title">Shopping Cart</h2>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart-msg d-flex justify-content-center">
                Your cart is currently empty.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="cart-item border-bottom
                     position-relative"
                >
                  <button
                    className=" rounded-4 border-0 end-0 top-0 m-2   position-absolute  "
                    onClick={() => removeFromCarts(item.id, item.size)}
                    style={{
                      zIndex: 1,
                      background: "transparent",
                    }}
                  >
                    <X size={18} />
                  </button>
                  <img
                    className="bg-image"
                    onClick={() => {
                      if (item.id) {
                        router.push(`/shop/${item.id}`);
                        onClose();
                      }
                    }}
                    src={item.images?.[0]?.asset?.url}
                    style={{
                      cursor: item.id ? "pointer" : "default",
                    }}
                    aria-label={item.productName}
                  />
                  <div className="item-details">
                    <p className="item-title fw-bold mb-0"> {item.title}</p>
                    <p className="item-size mb-0 bg-body-secondary  rounded-1 text-center">
                      Size: {(item.size || "").toUpperCase()}
                    </p>
                    <div className="item-price d-flex flex-column flex-md-row align-items-md-center align-items-start justify-content-md-between justify-content-start">
                      ₹{Number(item.price || 0).toFixed(2)}
                    </div>
                    <div className="d-flex align-items-center gap-10">
                      <div className="cart-plus-minus me-sm-3 me-1">
                        <button
                          className="qtybutton dec"
                          onClick={() => decreaseQuantity(item.id, item.size)}
                          style={{
                            top: "2px",
                            cursor:
                              item.quantity === 1 ? "not-allowed" : "pointer",
                          }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="fs-6 py-1 quantity-input"
                        />
                        <button
                          className="qtybutton inc"
                          style={{
                            top: "2px",
                          }}
                          onClick={() => increaseQuantity(item.id, item.size)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="cartTotalContainer">
            <hr className="horizontalLine" />
            <div className="subtotal">
              Subtotal <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <button
              className="bt-btn theme-btn w-100"
              onClick={() => {
                router.push("/checkout");
                onClose();
              }}
            >
              Checkout
            </button>
            <button
              className="cartButton my-4 d-flex justify-content-center"
              onClick={() => {
                router.push("/cart");
                onClose();
              }}
            >
              View cart
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div
        className={`side-cart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`side-cart ${isOpen ? "open" : ""}`}>
        {token ? <TokenData /> : <CartData />}
      </div>
    </>
  );
};

export default SideCart;
