import React from "react";
import { useRouter } from "next/navigation";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="empty-cart-container">
      <div className="empty-image">
        <img
          src="/img/shop/shopping-cart.png"
          alt="Empty Shopping Cart"
          className="empty-img"
          style={{
            width: "150px",
            height: "auto",
          }}
        />
      </div>

      <h2 className="empty-title">Your Shopping Bag is Empty</h2>
      <p className="empty-description">
        There is nothing in your bag. Let's add some items.
      </p>

      <button className="bt bt-btn" onClick={() => router.push("/shop")}>
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
