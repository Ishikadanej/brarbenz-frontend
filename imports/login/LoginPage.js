"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import useCartStore from "../../Zustand/cartStore";
import useAuthStore from "../../Zustand/useAuthStore";

import {
  getFirebaseAuth,
  googleProvider,
  popupResolver,
} from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleLogin } from "../login/api/api";
import { mergeGuestCart } from "../sidecart/utils";

const LoginPage = () => {
  const router = useRouter();

  const { loginMutation, isLoginPending } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { refetch } = useCart();
  const { cart } = useCartStore();
  const { setToken } = useAuthStore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
    refetch();
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Auth not available");

      const cred = await signInWithPopup(auth, googleProvider, popupResolver);
      const idToken = await cred.user.getIdToken();

      const res = await googleLogin(idToken); // your backend exchange

      if (res.token) {
        setToken(res.token);

        if (res.user) {
          // merge guest cart on backend if any
          await mergeGuestCart(res.user, res.token);
          localStorage.removeItem("guest-cart");
        }
      }

      refetch();
      toast.success("Login successful!", { autoClose: 1000 });

      // redirect after login
      router.push("/");
    } catch (err) {
      console.error("Google login failed:", err?.message || err);
      toast.error("Google login failed, try again.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light text-dark p-5 vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-4 d-flex align-items-center">
          <div
            className="p-2 rounded me-2"
            style={{ background: "#000" }}
          ></div>

          <h5 className="mb-0">Bearbenz</h5>
        </div>
        <h2 className="fw-bold mb-2">Login to your account</h2>
        <p className="text-muted mb-4">
          Enter your email below to login to your account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={isLoginPending}
          >
            {isLoginPending ? "Logging in..." : "Login"}
          </button>

          <div className="divider my-3">
            <span>or continue with</span>
          </div>

          <button
            type="button"
            className="btn google-btn w-100 py-2 mb-3"
            onClick={handleGoogleLogin}
          >
            <i className="fa-brands fa-google me-2"></i>
            Sign in with Google
          </button>

          <div className="text-center">
            <p className="text-muted">
              Don’t have an account?{" "}
              <a
                href="#"
                onClick={() => router.push("/register")}
                className="text-decoration-none text-primary"
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
