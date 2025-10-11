import React from "react";
import { useRouter } from "next/navigation";

const EmptyWishlist = () => {
  const router = useRouter();

  return (
    <div className="empty-cart-container">
      <div className="empty-image">
        <img
          src="/img/shop/wishlist.png"
          alt="Empty Shopping Cart"
          className="wishlist-img"
          style={{
            width: "150px",
            height: "auto",
          }}
        />
      </div>

      <h2 className="empty-title">Your Wishlist is Empty</h2>
      <p className="empty-description">
        Add items that you like to your wishlist. Review them anytime and easily
        move them to the bag.
      </p>

      <button className="bt bt-btn" onClick={() => router.push("/shop")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyWishlist;
