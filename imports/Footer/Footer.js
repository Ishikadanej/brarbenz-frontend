"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  CATEGORIES_QUERY,
  client,
  FILTER_CATEGORY_QUERY,
} from "../../lib/sanity";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import useProductsStore from "../../Zustand/productStore";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useAuth();
  const router = useRouter();
  const { setFilterProducts, selectedCat, setSelectedCat, setPage } =
    useProductsStore();

  if (!categories) return null;

  const categoryClick = async (title) => {
    try {
      setSelectedCat(title);
      setPage(1);

      const filteredProducts = await client.fetch(FILTER_CATEGORY_QUERY, {
        categoryTitle: title,
      });

      setFilterProducts(filteredProducts);

      router.push(`/shop?category=${encodeURIComponent(title)}&page=1`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(CATEGORIES_QUERY);
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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
                      <span>184 Main Rd E, St Albans VIC 3021, Australia</span>
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
                      <span>Contact@Company.Com</span>
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
                      <span>(+02) 1800 5656 3010</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 custom-width-20">
              <div className="footer-widget-four mb-30 ml-40">
                <h5>Categories</h5>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {categories?.map((item, index) => (
                    <li
                      className="single-categories"
                      key={index}
                      style={{
                        display: "flex",
                        minWidth: "120px",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      onClick={() => {
                        categoryClick(item.title);
                      }}
                    >
                      <span className="categories-footer">
                        <i className="fa-solid fa-chevron-right"></i>
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
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
                    Copyright 2025 Bearbenz Theme. All Rights Reserved. Powered By
                    Basictheme.
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
