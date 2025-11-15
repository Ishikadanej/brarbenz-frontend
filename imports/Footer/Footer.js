"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import useProductsStore from "../../Zustand/productStore";

const Footer = () => {
  const { token } = useAuth();
  const router = useRouter();

  const handleProfileClick = () => {
    if (token) {
      router.push("/account/profile");
    }
  };

  return (
    <footer>
      <div className="footer-area footer-four pt-85 pb-55">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6 custom-width-20">
              <div className="footer-widget-four mb-30">
                <h5>Get In Touch</h5>
                <div className="address-four">
                  <div
                    className="mb-20"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div className="add-icon ">
                      <MapPin />
                    </div>
                    <div className="add-text">
                      <span>SHOP-5, PANCHSHILA SKY, Chapprabhatta, Ganeshpura, Surat, Gujarat 394520</span>
                    </div>
                  </div>
                  <div
                    className="mb-20"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div className="add-icon">
                      <Mail size={20} />
                    </div>
                    <div className="add-text">
                      <span>Contact@bearbenz.Com</span>
                    </div>
                  </div>
                  <div
                    className="mb-20"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div className="add-icon">
                      <Phone size={20} />
                    </div>
                    <div className="add-text">
                      <span>(+91) 99 79 79 66 88</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
            <div className="col-xl-3 col-md-6 custom-width-20">
              <div className="footer-widget-four mb-30 ml-50">
                <h5>Quick Links</h5>
                <ul className="links-four">
                  <li>
                    <span onClick={handleProfileClick}>
                      <i className="fa-solid fa-chevron-right"></i> My Account
                    </span>
                  </li>
                  <li>
                    <span onClick={() => router.push("/about")}>
                      <i className="fa-solid fa-chevron-right"></i> About Us
                    </span>
                  </li>
                  <li>
                    <span onClick={() => router.push("/contact")}>
                      <i className="fa-solid fa-chevron-right"></i> Contact us
                    </span>
                  </li>
                  <li>
                    <span onClick={() => router.push("/shop")}>
                      <i className="fa-solid fa-chevron-right"></i> Shop
                    </span>
                  </li>
                  
                  <li>
                    <span onClick={() => router.push("/terms")}>
                      <i className="fa-solid fa-chevron-right"></i> Terms & Conditions
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-four">
        <div className="container">
          <div className="copy-border-four">
            <div className="row align-items-center">
              <div className="col-md-7 col-12">
                <div className="copy-four-text">
                  <span>
                    Copyright 2025 Bearbenz Theme. All Rights Reserved.
                  </span>
                </div>
              </div>
              <div className="col-md-5 col-12">
                <div className="copyright-payment text-right">
                  <img
                    src="/img/footer/footer.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
