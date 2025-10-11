"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../Zustand/useAuthStore";

const LogoutDialog = ({ open, setOpen }) => {
  const router = useRouter();
  const modalRef = useRef(null);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ zIndex: 1050 }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-login"
        role="document"
      >
        <div className="modal-content p-4 mobile-model" ref={modalRef}>
          <label className=" text-dark fs-5 fw-bold">
            Are you sure you want to log out?
          </label>
          <p className="mb-4 text-muted">
            You’ll be logged out and redirected to the login page.
          </p>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="cancel-btn "
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="button" className="mobile-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
