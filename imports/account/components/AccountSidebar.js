"use client";
import Link from "next/link";
import React, { useState } from "react";
import LogoutDialog from "./Logout";

const AccountSidebar = ({ activeTab }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <>
      <div className="d-none d-md-block ps-1 pt-4">
        <div className="mb-4">
          <ul className="list-unstyled">
            <li className="mb-2 fw-bold">ORDERS</li>
            <li className="pb-4 border-bottom">
              <Link href="/account/orders">
                <button
                  className={`account-btn w-100 text-start fw-bold ${
                    activeTab === "orders"
                      ? "active-tab text-success fw-bold  border-success"
                      : "text-secondary"
                  }`}
                >
                  <span
                    className={`${
                      activeTab === "orders" ? "underline-span" : ""
                    }`}
                  >
                    Orders & Returns
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="mb-2 fw-bold">ACCOUNT</p>
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link href="/account/profile">
                <button
                  className={`account-btn w-100 text-start fw-bold ${
                    activeTab === "profile"
                      ? "active-tab text-success fw-bold"
                      : "text-secondary fw-bold"
                  }`}
                >
                  <span
                    className={`${
                      activeTab === "profile" ? "underline-span" : ""
                    }`}
                  >
                    Profile
                  </span>
                </button>
              </Link>
            </li>
            <li className="mb-2">
              <button
                className={`account-btn w-100 text-start fw-bold ${
                  activeTab === "logout"
                    ? "active-tab text-danger fw-bold border-bottom border-2 border-danger"
                    : "text-secondary"
                }`}
                onClick={() => setLogoutDialogOpen(true)}
              >
                <span
                  className={`${
                    activeTab === "logout" ? "underline-span text-danger" : ""
                  }`}
                >
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="d-md-none sticky-top bg-white border-bottom shadow-sm">
        <div className="d-flex justify-content-between px-2 overflow-auto">
          <Link href="/account/orders">
            <button
              className={`account-btn-mobile ${
                activeTab === "orders"
                  ? "active-tab text-success fw-bold border-bottom border-2 border-success"
                  : "text-secondary"
              }`}
            >
              Orders
            </button>
          </Link>

          <Link href="/account/profile">
            <button
              className={`account-btn-mobile ${
                activeTab === "profile"
                  ? "active-tab text-success fw-bold border-bottom border-2 border-success"
                  : "text-secondary"
              }`}
            >
              Profile
            </button>
          </Link>

          <button
            className={`account-btn-mobile ${
              activeTab === "logout"
                ? "active-tab text-danger fw-bold border-bottom border-2 border-danger"
                : "text-secondary"
            }`}
            onClick={() => setLogoutDialogOpen(true)}
          >
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </div>

      {logoutDialogOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <LogoutDialog open={logoutDialogOpen} setOpen={setLogoutDialogOpen} />
        </>
      )}
    </>
  );
};

export default AccountSidebar;
