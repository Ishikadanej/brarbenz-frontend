"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { usePathname } from "next/navigation";
import AccountSidebar from "../components/AccountSidebar";

const AccountLayoutClient = ({ children }) => {
  const { user, token } = useAuth();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = pathname.split("/").pop();
    setActiveTab(path || "profile");
  }, [pathname]);
  return (
    <>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10  p-0">
            <div className="border-bottom pb-3">
              <h5 className="m-0">Account</h5>
              <p className="fw-bold m-0">
                {user?.name || "User"} {user?.lastName}
              </p>
            </div>
          </div>

          <div className="col-11 col-xl-10">
            <div className="row">
              <div className="col-12 col-md-3 col-lg-2 mb-4 mb-md-0 p-0">
                <AccountSidebar activeTab={activeTab} user={user} />
              </div>

              <div className="col-md-1 d-none d-md-flex justify-content-center p-0">
                <div
                  style={{
                    width: "1px",
                    backgroundColor: "#dee2e6",
                    height: "100%",
                  }}
                ></div>
              </div>

              <div className="col-12 col-md-8 col-lg-9 p-0">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLayoutClient;
