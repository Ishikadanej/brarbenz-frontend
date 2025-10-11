"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Slider from "react-slick";
import useCartStore from "../../../../Zustand/cartStore";
import { useWishlist } from "../../../../hooks/useWishlist";
import { useAddToCart } from "../../../../hooks/useAddToCart";
import { useCart } from "../../../../hooks/useCart";
import { useRemoveFromWishlist } from "../../../../hooks/useRemoveWishlist";
import { useAddToWishlist } from "../../../../hooks/useAddToWishlist";
import Cookies from "js-cookie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingCart } from "lucide-react";

const WishlistProducts = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const token = Cookies.get("token");
  const { refetch } = useCart();
  const { openCart } = useCartStore();
  const { refetch: wishlistRefetch, data: wishlist } = useWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const { addToWishlistMutation } = useAddToWishlist();
  const { addToCartMutation } = useAddToCart();

  const sliderRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(1200);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth || 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMaxSlides = () => {
    if (windowWidth < 768 && windowWidth > 424) return 2;
    if (windowWidth <= 425) return 1;
    if (windowWidth < 990) return 3;
    return 4;
  };

  const wishlistItems = useMemo(
    () => (Array.isArray(wishlist) ? wishlist : []),
    [wishlist]
  );
  const wishlistLength = wishlistItems.length;
  const maxSlides = getMaxSlides();
  const showSlider = wishlistLength > maxSlides;

  const sliderSettings = (maxSlides) => ({
    dots: false,
    arrows: false,
    speed: 300,
    slidesToShow: maxSlides,
    slidesToScroll: maxSlides,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "60px",
          className: "center",
        },
      },
    ],
  });

  const handleAddToCart = (product) => {
    const firstImageUrl = product.imageUrl || null;
    const selectedSize = product.size;
    const productPayload = {
      productId: product.id,
      productName: product.title,
      productImage: firstImageUrl,
      size: selectedSize,
      quantity: 1,
      price: product.price,
    };
    addToCartMutation(productPayload, {
      onSuccess: () => {
        refetch();
        openCart();
      },
    });
  };

  const handleToggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(
      (item) => item.product.id === product.id
    );
    const firstImageUrl =
      product.imageUrl || product.images?.[0]?.asset?.url || null;
    const selectedSize =
      product.sizes?.length > 0 ? product.sizes[0].title : "m";
    const productPayload = {
      productId: product.id,
      productName: product.title,
      productImage: firstImageUrl,
      size: selectedSize,
      quantity: 1,
      price: product.price,
    };

    if (isInWishlist) {
      removeFromWishlist(product.id, { onSuccess: () => wishlistRefetch() });
    } else {
      addToWishlistMutation(productPayload, {
        onSuccess: () => wishlistRefetch(),
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="wishlist col-sm-12 mt-100">
      {token ? (
        wishlistLength > 0 ? (
          <>
            {/* Title + external arrows in one row */}
            <HeaderRow>
              <div className="section-title pb-0">
                <h4 className="f-700">Wishlist Products</h4>
              </div>
              {showSlider && (
                <ArrowGroup>
                  <ArrowButton
                    type="button"
                    aria-label="Previous"
                    title="Previous"
                    onClick={() => sliderRef.current?.slickPrev()}
                  >
                    <i className="fa-solid fa-arrow-left-long" />
                  </ArrowButton>
                  <ArrowButton
                    type="button"
                    aria-label="Next"
                    title="Next"
                    onClick={() => sliderRef.current?.slickNext()}
                  >
                    <i className="fa-solid fa-arrow-right-long" />
                  </ArrowButton>
                </ArrowGroup>
              )}
            </HeaderRow>

            <div className="row product-active justify-content-start">
              <div className="col-sm-12 px-0">
                {showSlider ? (
                  <Slider
                    ref={sliderRef}
                    {...sliderSettings(maxSlides)}
                    className="product-active"
                  >
                    {wishlistItems.map((item, index) => {
                      const product = item.product;
                      return (
                        <Product key={product.id || index}>
                          <div style={{ padding: "0 10px" }}>
                            <div className="product-wrapper mb-40 ">
                              <div className="pro-img mb-20">
                                <div
                                  onClick={() =>
                                    router.push(`/shop/${product.id}`)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    backgroundImage: `url(${
                                      product.imageUrl ||
                                      product.images?.[0]?.asset?.url
                                    })`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    width: "100%",
                                    paddingTop: "120%",
                                    borderRadius: "4px",
                                  }}
                                  aria-label={product.title}
                                />
                                <div className="product-action text-center">
                                  <button
                                    type="button"
                                    title="Shopping Cart"
                                    style={{
                                      border: "none",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleAddToCart(product)}
                                  >
                                    {/* <i className="fa-solid fa-cart-arrow-down"></i> */}
                                    <ShoppingCart />
                                  </button>
                                </div>
                              </div>

                              <div className="pro-text">
                                <div className="pro-title">
                                  <h6
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      router.push(`/shop/${product.id}`)
                                    }
                                  >
                                    {product.title}
                                  </h6>
                                  <div className="common-price-hover">
                                    <h5 className="pro-price">
                                      ${product.price}
                                      {product.originalPrice && (
                                        <del>${product.originalPrice}</del>
                                      )}
                                    </h5>
                                  </div>
                                </div>
                                <div className="cart-icon">
                                  <button
                                    onClick={() =>
                                      handleToggleWishlist(product)
                                    }
                                    style={{
                                      border: "none",
                                      background: "transparent",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <i
                                      className="fa-solid fa-heart"
                                      style={{ color: "red" }}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Product>
                      );
                    })}
                  </Slider>
                ) : (
                  <FlexGrid>
                    {wishlistItems.map((item, index) => {
                      const product = item.product;
                      return (
                        <Product
                          key={product.id || index}
                          style={{
                            flex: `0 0 calc(${100 / maxSlides}% - 20px)`,
                          }}
                        >
                          <div className="product-wrapper mb-40">
                            <div className="pro-img mb-20">
                              <div
                                onClick={() =>
                                  router.push(`/shop/${product.id}`)
                                }
                                style={{
                                  cursor: "pointer",
                                  backgroundImage: `url(${
                                    product.imageUrl ||
                                    product.images?.[0]?.asset?.url
                                  })`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  width: "100%",
                                  paddingTop: "120%",
                                  borderRadius: "4px",
                                }}
                                aria-label={product.title}
                              />
                              <div className="product-action text-center">
                                <button
                                  type="button"
                                  title="Shopping Cart"
                                  style={{ border: "none", cursor: "pointer" }}
                                  onClick={() => handleAddToCart(product)}
                                >
                                  {/* <i className="fa-solid fa-cart-arrow-down"></i> */}
                                  <ShoppingCart />{" "}
                                </button>
                              </div>
                            </div>

                            <div className="pro-text">
                              <div className="pro-title">
                                <h6
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    router.push(`/shop/${product.id}`)
                                  }
                                >
                                  {product.title}
                                </h6>
                                <div className="common-price-hover">
                                  <h5 className="pro-price">
                                    ${product.price}
                                    {product.originalPrice && (
                                      <del>${product.originalPrice}</del>
                                    )}
                                  </h5>
                                </div>
                              </div>
                              <div className="cart-icon">
                                <button
                                  onClick={() => handleToggleWishlist(product)}
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                  }}
                                >
                                  <i
                                    className="fa-solid fa-heart"
                                    style={{ color: "red" }}
                                  ></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Product>
                      );
                    })}
                  </FlexGrid>
                )}
              </div>
            </div>
          </>
        ) : (
          <p></p>
        )
      ) : null}
    </div>
  );
};

export default WishlistProducts;

/* ===== Styled: header + external arrows + grid fallback ===== */

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 45px;
  margin-bottom: 0 !important;
  @media (max-width: 575px) {
    padding-bottom: 30px;
  }
`;

const ArrowGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const ArrowButton = styled.button`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  padding: 8px 10px;
  line-height: 1;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 575px) {
    padding: 6px;
    min-width: unset;
    min-height: unset;
  }
`;

const Product = styled.div`
  max-width: 385px;
  width: 100%;
`;

const FlexGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;
