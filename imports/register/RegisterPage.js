"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";
import useCartStore from "../../Zustand/cartStore";
import Image from "next/image";

const RegisterPage = () => {
  const router = useRouter();
  const { cart } = useCartStore();
  const searchParams = useSearchParams();
  const fromCheckout = searchParams.get("from") === "checkout";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { registerMutation, isRegisterPending } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">
        {/* Left: full-height image on md+, hidden on mobile */}
        <div className="col-md-6 d-none d-md-block position-relative">
          <Image
            src="https://images.pexels.com/photos/6591432/pexels-photo-6591432.jpeg"
            alt="Plant in vase"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 0vw"
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>

        {/* Right: form panel */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-light p-4 p-md-5">
          <div className="w-100 p-4 p-sm-0" style={{ maxWidth: 420 }}>
            <div className="mb-4 d-flex align-items-center">
              <div className="bg-primary p-2 rounded me-2" />
              <h5 className="mb-0 text-dark">Spdit</h5>
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
      </div>

      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
