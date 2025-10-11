"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import {
  getFirebaseAuth,
  googleProvider,
  popupResolver,
} from "../../../../lib/firebase";
import { googleLogin } from "../../../login/api/api";
import { signInWithPopup } from "firebase/auth";
import useAuthStore from "../../../../Zustand/useAuthStore";
import { mergeGuestCart } from "../../../sidecart/utils";
import { toast } from "react-toastify";
import { useCart } from "../../../../hooks/useCart";

const LoginPopup = ({ onClose }) => {
  const { loginMutation, loginError, isLoginPending } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");

  const router = useRouter();
  const { setUser, user, token, setToken, logout } = useAuthStore();
  const { refetch } = useCart();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Auth not available on server");

      const cred = await signInWithPopup(auth, googleProvider, popupResolver);
      const idToken = await cred.user.getIdToken();

      const res = await googleLogin(idToken);

      if (res.token) {
        setToken(res.token);

        if (res.user) {
          await mergeGuestCart(res.user, res.token);
          localStorage.removeItem("guest-cart");
        }
      }
      refetch();
      toast.success("Login successful!", { autoClose: 1000 });
      onClose();
    } catch (err) {
      console.error(
        "Google login failed:",
        err?.code || "",
        err?.message || err
      );
      setLocalError("Google login failed, please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    loginMutation(formData, {
      onSuccess: () => {
        refetch();
        onClose();
      },
      onError: (error) => {
        setLocalError(error?.message || "Invalid email or password.");
      },
    });
  };

  return (
    <div className="popup-overlay">
      <div className="login-popup">
        <div className="popup-header text-center">
          <div className="popup-icon">
            <i className="fa-solid fa-user"></i>
          </div>
          <h2 className="fs-4 fw-bold text-dark mt-3">Welcome Back</h2>
          <p className="popup-message">Please login to continue to checkout</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            id="email"
            type="email"
            placeholder="Enter Email..."
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control input-custom mb-3"
          />

          <input
            id="password"
            type="password"
            placeholder="Enter password..."
            value={formData.password}
            onChange={handleChange}
            className="form-control input-custom mb-3 "
            required
          />
          {localError && (
            <div
              className="text-danger text-left py-2 mb-3 "
              style={{ fontSize: "12px" }}
            >
              {localError}
            </div>
          )}

          <div className="d-flex justify-content-center w-100">
            <button
              type="submit"
              className="bt-btn theme-btn-2 w-100"
              disabled={isLoginPending}
            >
              {isLoginPending ? "Logging in..." : "Login Now"}
            </button>
          </div>
        </form>

        <div className="divider my-3">
          <span>or continue with</span>
        </div>

        <button
          className="btn google-btn w-100 py-2 mb-3"
          onClick={handleGoogleLogin}
        >
          <i className="fa-brands fa-google me-2"></i>
          Sign in with Google
        </button>

        <div className="popup-footer text-center mt-2">
          <p className="mb-0">
            Don't have an account?{" "}
            <span
              className="text-primary fw-medium"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/register?from=checkout")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
