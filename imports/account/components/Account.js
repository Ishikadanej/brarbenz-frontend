import { Heart, ShoppingBasket, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Account = () => {
  const router = useRouter();
  const [blink, setBlink] = useState(false);

  const handleClick = (path) => {
    setBlink(true);
    setTimeout(() => setBlink(false), 300);
    router.push(path);
  };

  return (
    <div
      className={`card account-card shadow-lg border-0 rounded-4 py-4 px-3 ${
        blink ? "blink" : ""
      }`}
      style={{
        width: "280px",
        background: "#fff",
      }}
    >
      <div className="text-center mb-3">
        <div
          className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-1 "
          style={{ width: "60px", height: "60px" }}
        >
          <User size={28} style={{ color: "#3e976c" }} />
        </div>
        <h5 className="fw-bold mb-1">Welcome</h5>
        <p className="text-muted small mb-0">
          Access your account and manage orders
        </p>
      </div>

      <div className="d-flex flex-column mb-2">
        <div
          className="menu-link d-flex align-items-center gap-2 fw-semibold"
          onClick={() => handleClick("/login")}
        >
          <User size={18} /> <span>Profile</span>
        </div>
        <div
          className="menu-link d-flex align-items-center gap-2 fw-semibold"
          onClick={() => handleClick("/login")}
        >
          <ShoppingBasket size={18} /> <span>Orders</span>
        </div>
        <div
          className="menu-link d-flex align-items-center gap-2 fw-semibold"
          onClick={() => handleClick("/login")}
        >
          <Heart size={18} /> <span>Wishlist</span>
        </div>
      </div>

      <div className="mx-auto">
        <button className="bt-btn py-3" onClick={() => handleClick("/login")}>
          Login / Signup
        </button>
      </div>
    </div>
  );
};

export default Account;
