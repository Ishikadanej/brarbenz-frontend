"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import Image from "next/image";

const LoginPage = () => {
  const { loginMutation, isLoginPending } = useAuth((data) => {
    setTimeout(() => router.push("/"), 1000);
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { refetch } = useCart();
  const router = useRouter();

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

  return (
   <div className="d-flex flex-column justify-content-center align-items-center bg-light text-dark p-5 vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-4 d-flex align-items-center">
          <div className="bg-primary p-2 rounded me-2"></div>
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
