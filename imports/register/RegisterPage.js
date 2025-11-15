"use client";

import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";
import useCartStore from "../../Zustand/cartStore";
import {
  getFirebaseAuth,
  googleProvider,
  popupResolver,
} from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleLogin } from "../login/api/api";
import { mergeGuestCart } from "../sidecart/utils";
import useAuthStore from "../../Zustand/useAuthStore";

const RegisterPage = () => {
  const { refetch } = useCart();
  const router = useRouter();
  const { cart } = useCartStore();
  const searchParams = useSearchParams();
  const fromCheckout = searchParams.get("from") === "checkout";
  const { setUser, user, token, setToken, logout } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const { registerMutation, isRegisterPending } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");

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

      // redirect after login
      if (fromCheckout) {
        router.push("/checkout");
      } else {
        router.push("/");
      }

    } catch (err) {
      console.error("Google login failed:", err?.message || err);
      setLocalError("Google login failed, please try again.");
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    registerMutation(
      { ...formData, fromCheckout, cart },
      {
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      }
    );
  };

  return (
    <div className="container-fluid p-0 min-vh-100 ">
      <div className="d-flex align-items-center justify-content-center bg-light p-4 p-md-5 min-vh-100">
        <div className="w-100 p-4 p-sm-0" style={{ maxWidth: 420 }}>
          <div className="mb-4 d-flex align-items-center">
            <div
              className="p-2 rounded me-2"
              style={{ background: "#000" }}
            ></div>

            <h5 className="mb-0 text-dark">Bearbenz</h5>
          </div>

          <h2 className="fw-bold mb-2 text-dark">Sign up from here</h2>
          <p className="text-muted mb-4">
            Enter your details below to register a new account
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-dark">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-dark">
                Password
              </label>
              <div className="input-group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading || isRegisterPending}
            >
              {loading || isRegisterPending ? "Registering..." : "Register"}
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
              <p className="text-muted mb-0">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/login");
                  }}
                  className="text-decoration-none"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>


      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
