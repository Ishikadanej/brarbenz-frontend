"use client";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import useProductsStore from "../../../Zustand/productStore";
import useCartStore from "../../../Zustand/cartStore";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useCart } from "../../../hooks/useCart";
import { useWishlist } from "../../../hooks/useWishlist";
import { useAddToWishlist } from "../../../hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "../../../hooks/useRemoveWishlist";
import Cookies from "js-cookie";
import { useAuth } from "../../../hooks/useAuth";
import { Heart, ShoppingCart } from "lucide-react";
import CategoryProductsSkeleton from "./skeleton/CaegoryProductSkeleton";

const TrendingProduct = () => {
  const router = useRouter();
  const { products } = useProductsStore();
  const { addToCartMutation } = useAddToCart();
  const { addToWishlistMutation } = useAddToWishlist();
  const { openCart, wishlist, addToCart } = useCartStore();
  const { refetch } = useCart();
  const { refetch: wishlistRefetch } = useWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const token = Cookies.get("token");
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sliderRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth || 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getMaxSlides = () => {
    if (windowWidth < 768 && windowWidth > 424) return 2;
    if (windowWidth <= 425) return 1;
    if (windowWidth < 990) return 3;
    return 4;
  };

  const handleAddToCart = (product) => {
    if (!token || !user) {
      const selectedSize =
        product.sizes?.length > 0 ? product.sizes[0].title : "m";
      addToCart({
        ...product,
        size: selectedSize,
        quantity: 1,
      });
      openCart();
      return;
    }

    const firstImageUrl =
      product.images?.length > 0 ? product.images[0].asset?.url : null;

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

    addToCartMutation(productPayload, {
      onSuccess: () => {
        refetch();
        openCart();
      },
    });
  };

  const handleAddtoWishlist = (product, isInWishlist) => {
    const firstImageUrl =
      product.images?.length > 0 ? product.images[0].asset?.url : null;

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
      removeFromWishlist(product.id, {
        onSuccess: () => {
          wishlistRefetch();
        },
      });
    } else {
      addToWishlistMutation(productPayload, {
        onSuccess: () => {
          wishlistRefetch();
        },
      });
    }
  };

  const productCount = products?.length ?? 0;
  const maxSlides = getMaxSlides();
  const showSlider = productCount > maxSlides;

  const sliderSettings = {
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
  };

  return (
    <>
      {(!mounted && !products) || products.length === 0 ? (
        <div className="pt-60">
          <CategoryProductsSkeleton />
        </div>
      ) : (
        <section className="product-h-two pt-60 pb-60">
          <div className="container">
            {/* Title + external arrows */}
            <div className="row">
              <div className="col-sm-12">
                <HeaderRow>
                  <Title className="f-700">Trending Products</Title>
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
                <Subtitle>
                  Street art salvia irony wolf waistcoat actually lomo meh fap
                  jean shorts.
                </Subtitle>
              </div>
            </div>

            <div className="row product-active">
              <div className="col-sm-12">
                {showSlider ? (
                  <Slider
                    ref={(el) => (sliderRef.current = el)}
                    {...sliderSettings}
                    className="product-active"
                  >
                    {products.map((product, index) => {
                      const isInWishlist = wishlist?.some(
                        (item) => item?.product?.id === product.id
                      );

                      return (
                        <Product key={product._key || product.id || index}>
                          <div
                            className="product-wrapper mb-40"
                            style={{ padding: "0 10px" }}
                          >
                            <div className="pro-img mb-20">
                              <div
                                onClick={() =>
                                  router.push(`/shop/${product.id}`)
                                }
                                style={{
                                  cursor: "pointer",
                                  backgroundImage: `url(${product.images?.[0]?.asset?.url})`,
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
                                    padding: 0,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <ShoppingCart />
                                </button>
                              </div>
                            </div>

                            <div className="pro-text">
                              <div className="pro-title">
                                <h6>
                                  <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      router.push(`/shop/${product.id}`)
                                    }
                                  >
                                    {product.title}
                                  </div>
                                </h6>
                                <div className="common-price-hover">
                                  <h5 className="pro-price">
                                    ₹{product.price}
                                    {product.originalPrice && (
                                      <del>₹{product.originalPrice}</del>
                                    )}
                                  </h5>
                                </div>
                              </div>
                              {token && (
                                <div className="cart-icon">
                                  <button
                                    onClick={() =>
                                      handleAddtoWishlist(
                                        product,
                                        !!isInWishlist
                                      )
                                    }
                                    style={{
                                      border: "none",
                                      background: "transparent",
                                      cursor: "pointer",
                                    }}
                                    disabled={!token}
                                  >
                                    <Heart
                                      size={20}
                                      className=" cursor-pointer"
                                      fill={isInWishlist ? "red" : "none"}
                                      stroke={isInWishlist ? "red" : "gray"}
                                    />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </Product>
                      );
                    })}
                  </Slider>
                ) : (
                  <FlexGrid>
                    {products.map((product, index) => {
                      const isInWishlist = wishlist?.some(
                        (item) => item?.product?.id === product.id
                      );

                      return (
                        <Product
                          key={product._key || product.id || index}
                          style={{
                            flex: `0 0 calc(${100 / maxSlides}% - 20px)`,
                          }}
                        >
                          <div className="product-wrapper mb-40">
                            <div className="pro-img mb-20">
                              <div
                                onClick={() => router.push(`/shop/${product.id}`)}
                                style={{
                                  cursor: "pointer",
                                  backgroundImage: `url(${product.images?.[0]?.asset?.url})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  width: "100%",
                                  paddingTop: "130%",
                                  borderRadius: "4px",
                                }}
                                aria-label={product.title || ""}
                              ></div>
                              <div className="product-action text-center">
                                <button
                                  type="button"
                                  title="Shopping Cart"
                                  style={{
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <ShoppingCart />
                                </button>
                              </div>
                            </div>

                            <div className="pro-text">
                              <div className="pro-title">
                                <h6>
                                  <div
                                    onClick={() => router.push(`/shop/${product.id}`)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {product.title}
                                  </div>
                                </h6>
                                <div className="common-price-hover">
                                  <h5 className="pro-price">
                                    ₹{product.price}
                                    {product.originalPrice && (
                                      <del>₹{product.originalPrice}</del>
                                    )}
                                  </h5>
                                </div>
                              </div>
                              {token && (
                                <div className="cart-icon">
                                  <button
                                    onClick={() =>
                                      handleAddtoWishlist(product, isInWishlist)
                                    }
                                    style={{
                                      border: "none",
                                      background: "transparent",
                                      cursor: "pointer",
                                    }}
                                    disabled={!token}
                                  >
                                    <Heart
                                      size={20}
                                      className=" cursor-pointer"
                                      fill={isInWishlist ? "red" : "none"}
                                      stroke={isInWishlist ? "red" : "gray"}
                                    />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </Product>
                      );
                    })}
                  </FlexGrid>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TrendingProduct;

/* ---------- styled-components ---------- */

const Title = styled.p`
  font-size: 34px;
  margin-bottom: 0;
  @media (max-width: 575px) {
    font-size: 20px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 16px;
`;

const Subtitle = styled.span`
  display: block;
  margin-top: -8px;
  padding-bottom: 29px;
  color: rgba(0, 0, 0, 0.7);
  @media (max-width: 575px) {
    font-size: 12px;
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
    min-width: unset;
    min-height: unset;
    padding: 6px;
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
