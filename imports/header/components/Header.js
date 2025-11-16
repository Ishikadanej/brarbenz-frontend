"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useProductsStore from "../../../Zustand/productStore";
import useCartStore from "../../../Zustand/cartStore";
import Account from "../../account/components/Account";
import SearchModal from "../components/SeachModel";
import { useAuth } from "../../../hooks/useAuth";
import { Heart, Search, ShoppingCart, User } from "lucide-react";


const HeaderWrapper = styled.header`
  &.header-h-four {
    width: 100%;
  }
`;

const HeaderMenu = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    display: none;   /* 👈 hide desktop header on mobile */
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const DesktopMenu = styled.nav`
  ul {
    display: flex;
    align-items: center;
    gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      cursor: pointer;

      &.active span {
        font-weight: bold;
      }
    }
  }
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  flex-shrink: 0;

  img {
    width: 100px;
    height: auto;
  }
    @media (max-width: 768px) {
    img {
      width: 70px;
    }

  }
    @media (max-width: 480px) {
    img {
      width: 50px;
    }
}
`;


const IconGroup = styled.div`
  display: flex;
  align-items: center;

  span {
    cursor: pointer;
    margin-left: 20px;
    position: relative;
  }
`;

const CartBadge = styled.span`
  color: white;
  background-color: #000;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: -5px;
  right: -10px;
`;

const MobileMenuWrapper = styled.div`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

const SlideBar = styled.aside`
  position: fixed;
  background: white;
  width: 300px;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-300px")};
  height: 100vh;
  transition: 0.3s;
  z-index: 9999;
`;


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9998;
`;

const MobileMenu = styled.nav`
  ul {
    list-style: none;
    padding: 20px;

    li {
      margin-bottom: 15px;
      cursor: pointer;

      &.active span {
        font-weight: bold;
      }
    }
  }
`;

const MobileHeaderBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 15px;
    background: white;
  }
`;


const MobileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const MobileRight = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: end;

  @media (max-width: 768px) {
    display: none; /* Hide for mobile */
  }
`;

const CloseButton = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
padding-right: 15px;
padding-top: 10px;
cursor: pointer;
`;

const Logocontainer = styled.div`
display: flex;
gap:8px;
align-items: center;
`;
const Devider = styled.div`
width: 2px;
height: 37px;
background-color: #000;
@media (max-width: 768px) { 
height: 20px;
}
`;

const LogoTitle = styled.div`
font-size: 26px;
font-weight: bold;
color: #000;
@media (max-width: 768px) {
    font-size: 20px;
  }
    @media (max-width: 480px) { 
    font-size: 15px;
}
`;

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
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

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

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSearchOpen, showAccount]);

  useEffect(() => {
    const handleScroll = () => {
      if (isSearchOpen) closeSearch();
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
      <HeaderWrapper className="header-h-four">
        <MobileHeaderBar>
          <MobileLeft>
            <span onClick={handleMobileMenuOpen}>
              <i className="fa-solid fa-bars fa-lg" />
            </span>
            <span
              ref={searchWrapRef}
              onClick={(e) => {
                e.preventDefault();
                toggleSearch();
              }}
            >
              <Search size={22} />
            </span>
          </MobileLeft>
          <LogoWrapper onClick={() => router.push("/")}>
            <Logocontainer>
              <img src="/img/logo/logo1.png" alt="Logo" /><Devider></Devider><LogoTitle>BEARBENZ</LogoTitle>
            </Logocontainer>
          </LogoWrapper>
          <MobileRight>
            <span ref={accountRef} onClick={handleProfile}>
              <User size={22} />
              {!isUserLoading && showAccount && !token && (
                <div style={{ position: "absolute", top: "87px", right: "15px", zIndex: 1000 }}>
                  <Account size={22} />
                </div>
              )}
            </span>

            {/* Wishlist */}
            {token && (
              <span onClick={() => router.push("/wishlist")}>
                <Heart size={22} />
              </span>
            )}

            {/* Cart */}
            <span onClick={() => router.push("/cart")}>
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
                              top: "28px",
                              right: "-3px",
                            }}
                          >
                            {token ? count : cartCount}
                          </span>
              )}
            </span>
          </MobileRight>
        </MobileHeaderBar>
        <SlideBar $isOpen={isMenuOpen}>

          <CloseButton className="close-mobile-menu">
            <span onClick={handleMobileMenuClose}>
              <i className="fa-solid fa-times" />
            </span>
          </CloseButton>
          <MobileMenu>
            <ul>
              <li className={pathname === "/" ? "active" : ""}>
                <span onClick={() => router.push("/")}>Home</span>
              </li>
              <li className={pathname === "/about" ? "active" : ""}>
                <span onClick={() => router.push("/about")}>About</span>
              </li>
              <li className={pathname === "/shop" ? "active" : ""}>
                <span onClick={() => router.push("/shop")}>Shop</span>
              </li>
              <li className={category === "shirts" ? "active" : ""}>
                <span onClick={() => router.push("/shop?category=shirts&page=1")}>Shirts</span>
              </li>
              <li className={category === "tshirts" ? "active" : ""}>
                <span onClick={() => router.push("/shop?category=tshirts&page=1")}>Tshirts</span>
              </li>
              <li className={pathname === "/contact" ? "active" : ""}>
                <span onClick={() => router.push("/contact")}>Contact</span>
              </li>
            </ul>
          </MobileMenu>

        </SlideBar>
        {isMenuOpen && <Overlay onClick={handleMobileMenuClose} />}

        <HeaderMenu className="header-menu-two">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <HeaderContainer>

                  {/* Desktop Menu */}
                  <div className="main-menu d-none d-md-block">
                    <DesktopMenu>
                      <ul>
                        <li className={category === "shirts" ? "active" : ""}>
                          <span onClick={() => router.push("/shop?category=shirts&page=1")}>SHIRTS</span>
                        </li>
                        <li className={category === "tshirts" ? "active" : ""}>
                          <span onClick={() => router.push("/shop?category=tshirts&page=1")}>TSHIRTS</span>
                        </li>
                        <li className={!category ? "active" : ""}>
                          <span onClick={() => router.push("/shop")}>SHOP ALL</span>
                        </li>
                      </ul>
                    </DesktopMenu>
                  </div>

                  {/* Logo */}
                  <LogoWrapper onClick={() => router.push("/")}>
                    <Logocontainer>
                      <img src="/img/logo/logo1.png" alt="Logo" /><Devider></Devider><LogoTitle>BEARBENZ</LogoTitle>
                    </Logocontainer>
                  </LogoWrapper>

                  {/* Right Icons */}
                  <HeaderRight>
                    <IconGroup>

                      {/* Search */}
                      <span
                        ref={searchWrapRef}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSearch();
                        }}
                      >
                        <Search size={22} />
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

                      {/* Account */}
                      <span ref={accountRef} onClick={handleProfile}>
                        <User size={22} />
                        {!isUserLoading && showAccount && !token && (
                          <div style={{ position: "absolute", top: "30px", right: "-45px", zIndex: 1000 }}>
                            <Account size={22} />
                          </div>
                        )}
                      </span>

                      {/* Wishlist */}
                      {token && (
                        <span onClick={() => router.push("/wishlist")}>
                          <Heart size={22} />
                        </span>
                      )}

                      {/* Cart */}
                      <span onClick={() => router.push("/cart")}>
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
                              top: "-16px",
                              right: "-16px",
                            }}
                          >
                            {token ? count : cartCount}
                          </span>
                        )}
                      </span>
                    </IconGroup>

                    {/* Mobile Menu Icon */}
                    <MobileMenuWrapper>
                      <span onClick={handleMobileMenuOpen}>
                        <i className="fa-solid fa-bars fa-xs" />
                      </span>
                    </MobileMenuWrapper>
                  </HeaderRight>
                </HeaderContainer>
              </div>
            </div>
          </div>
        </HeaderMenu>
      </HeaderWrapper>
      {/* Overlay */}
    </>
  );
};

export default Header;
