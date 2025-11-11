"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import useProductsStore from "../../../Zustand/productStore";
import useCartStore from "../../../Zustand/cartStore";
import Account from "../../account/components/Account";
import SearchModal from "../components/SeachModel";
import { useAuth } from "../../../hooks/useAuth";
import { Heart, Search, ShoppingCart, User } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const searchWrapRef = useRef(null);
  const accountRef = useRef(null);
  const { products } = useProductsStore();
  const { cartCount, count } = useCartStore();
  const { token, isUserLoading } = useAuth();
<<<<<<< Updated upstream
=======
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
>>>>>>> Stashed changes

  const handleMobileMenuOpen = () => {
    setIsMenuOpen(true);
    document.body.classList.add("on-side");
  };

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("on-side");
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      if (!prev) setShowAccount(false);
      return !prev;
    });
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const closeSearch = (e) => {
    if (e) e.preventDefault();
    setIsSearchOpen(false);
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const handleSearchClick = (e) => e.stopPropagation();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(event.target)
      ) {
        closeSearch();
      }

      if (
        accountRef.current &&
        !accountRef.current.contains(event.target) &&
        showAccount
      ) {
        setShowAccount(false);
      }
    };

    if (isSearchOpen || showAccount) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSearchOpen, showAccount]);

  useEffect(() => {
    const handleScroll = () => {
      if (isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSearchOpen]);

  const handleProfile = () => {
    if (!token) {
      setShowAccount((prev) => {
        if (!prev) setIsSearchOpen(false);
        return !prev;
      });
    } else {
      router.push("/account/profile");
    }
  };

  useEffect(() => {
    if (token && showAccount) setShowAccount(false);
  }, [token]);

  return (
    <>
      <header className="header-h-four">
        <div className="header-menu-two">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <div
                  className="header-flex"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <div className="main-menu main-menu-4 d-none d-lg-block">
                    <nav id="desktop-menu">
                      <ul
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          margin: 0,
                          padding: 0,
                          listStyle: "none",
                        }}
                      >
<<<<<<< Updated upstream
                        <li
                          className={pathname === "/" ? "active" : ""}
                          onClick={() => router.push("/")}
                          style={{ cursor: "pointer" }}
                        >
                          Home
                        </li>
                        <li
                          className={pathname === "/about" ? "active" : ""}
                          onClick={() => router.push("/about")}
                          style={{ cursor: "pointer" }}
                        >
                          About
                        </li>
                        <li
                          className={pathname === "/shop" ? "active" : ""}
                          onClick={() => router.push("/shop")}
                          style={{ cursor: "pointer" }}
                        >
                          Shop
                        </li>
                        <li
                          className={pathname === "/contact" ? "active" : ""}
                          onClick={() => router.push("/contact")}
                          style={{ cursor: "pointer" }}
                        >
                          Contact
                        </li>
=======
                        <li className={category === "shirts" ? "active" : ""}>
                          <span
                            onClick={() => {
                              router.push("/shop?category=shirts&page=1");
                              handleMobileMenuClose();
                            }}
                          >
                            SHIRTS
                          </span>
                        </li>

                        <li className={category === "tshirts" ? "active" : ""}>
                          <span
                            onClick={() => {
                              router.push("/shop?category=tshirts&page=1");
                              handleMobileMenuClose();
                            }}
                          >
                            TSHIRTS
                          </span>
                        </li>

                        <li className={!category ? "active" : ""}>
                          <span
                            onClick={() => {
                              router.push("/shop");
                              handleMobileMenuClose();
                            }}
                          >
                            SHOP ALL
                          </span>
                        </li>

>>>>>>> Stashed changes
                      </ul>
                    </nav>
                  </div>

                  <div className="logo text-center" style={{ flexShrink: 0 }}>
                    <span
                      onClick={() => router.push("/")}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="/img/logo/logo1.png"
                        className="img-fluid"
                        alt="Logo"
<<<<<<< Updated upstream
                        style={{ width: "140px", height: "auto" }}
=======
                        style={{ width: "100px", height: "auto" }}

>>>>>>> Stashed changes
                      />
                    </span>
                  </div>

                  <dev className="gap-4 header-right header-right-4 d-flex align-items-center justify-content-end">
                    <div className="header-left-icon header-left-icon4 d-flex">
                      <span
                        ref={searchWrapRef}
                        className="search-btn nav-search search-trigger"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSearch();
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <Search size={22} className="d-none d-sm-block" />
                        <Search size={18} className="d-block d-sm-none" />
                        {isSearchOpen && (
                          <SearchModal
                            isSearchOpen={isSearchOpen}
                            searchTerm={searchTerm}
                            filteredProducts={filteredProducts}
                            closeSearch={closeSearch}
                            handleSearchClick={handleSearchClick}
                            stopPropagation={(e) => e.stopPropagation()}
                            handleSearchChange={handleSearchChange}
                            router={router}
                          />
                        )}
                      </span>

                      <span
                        ref={accountRef}
                        style={{ cursor: "pointer", position: "relative", marginLeft: "20px" }}
                        onClick={handleProfile}
                      >
                        <User size={22} />
                        {!isUserLoading && showAccount && !token && (
                          <div
                            className="account"
                            style={{
                              position: "absolute",
                              top: "30px",
                              right: "-45px",
                              zIndex: 1000,
                            }}
                          >
                            <Account size={22} />
                          </div>
                        )}
                      </span>

                      {token && (
                        <span
                          onClick={() => router.push("/wishlist")}
                          style={{ cursor: "pointer", marginLeft: "20px" }}
                        >
                          <Heart size={22} />
                        </span>
                      )}

                      <span
                        onClick={() => router.push("/cart")}
                        style={{ cursor: "pointer", position: "relative", marginLeft: "20px" }}
                      >
                        <ShoppingCart size={22} />
                        {(token ? count : cartCount) > 0 && (
                          <span
                            style={{
                              color: "white",
                              backgroundColor: "#000",
                              borderRadius: "50%",
                              padding: "2px 6px",
                              fontSize: "12px",
                              position: "absolute",
                              top: "-5px",
                              right: "-10px",
                            }}
                          >
                            {token ? count : cartCount}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="d-block d-lg-none">
                      <div className="hamburger-menu text-right">
                        <span
                          onClick={handleMobileMenuOpen}
                          className="menu-trigger-button"
                        >
                          <i className="fa-solid fa-bars fa-xs" />
                        </span>
                      </div>
                    </div>
                  </dev>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <aside className={`slide-bar ${isMenuOpen ? "show" : ""}`}>
        <div className="close-mobile-menu">
          <span onClick={handleMobileMenuClose} className="menu-close-button">
            <i className="fa-solid fa-times" />
          </span>
        </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        <nav className="side-mobile-menu">
          <ul id="mobile-menu-active">
            <li className={pathname === "/" ? "active" : ""}>
              <span
                onClick={() => {
                  router.push("/");
                  handleMobileMenuClose();
                }}
              >
                Home
              </span>
            </li>
            <li className={pathname === "/about" ? "active" : ""}>
              <span
                onClick={() => {
                  router.push("/about");
                  handleMobileMenuClose();
                }}
              >
                About
              </span>
            </li>
            <li className={pathname === "/shop" ? "active" : ""}>
              <span
                onClick={() => {
                  router.push("/shop");
                  handleMobileMenuClose();
                }}
              >
                Shop
              </span>
            </li>
            <li className={pathname === "/contact" ? "active" : ""}>
              <span
                onClick={() => {
                  router.push("/contact");
                  handleMobileMenuClose();
                }}
              >
                Contact
              </span>
            </li>
          </ul>
        </nav>
      </aside>

      {isMenuOpen && (
        <div className="body-overlay active" onClick={handleMobileMenuClose} />
      )}
    </>
  );
};

export default Header;



