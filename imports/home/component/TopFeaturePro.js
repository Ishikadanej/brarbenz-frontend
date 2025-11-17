"use client";
import React, { useEffect, useState } from "react";
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
import TopFeatureProSkeleton from "./skeleton/TopFeatureProSkeleton";

const TopFeaturePro = ({ data }) => {
  const [banner, setBanner] = useState(null);
  const { products, fetchProducts } = useProductsStore();
  const [topProducts, setTopProducts] = useState([]);
  const router = useRouter();
  const { addToCartMutation, isPending } = useAddToCart();
  const { addToWishlistMutation } = useAddToWishlist();
  const { openCart, wishlist, addToCart } = useCartStore();
  const { refetch } = useCart();
  const { refetch: wishlistRefetch } = useWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const token = Cookies.get("token");
  const { user } = useAuth();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

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
      product.images?.length > 0 ? product.images[0].asset.url : null;

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
      product.images?.length > 0 ? product.images[0].asset.url : null;

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

  const handleClick = () => {
    router.push(banner.buttonLink || "/");
  };

  useEffect(() => {
    if (products.length > 0) {
      const topFeatureProducts = products.filter(
        (product) => product.isFeatured
      );
      setTopProducts(topFeatureProducts);
    }
  }, [products]);

  // set banner from the already-provided data prop
  useEffect(() => {
    if (!data) return;
    const sellingBanners = data?.sections?.filter(
      (section) => section._type === "sellingBanner"
    );
    const secondSellingBanner =
      sellingBanners && sellingBanners.length > 1 ? sellingBanners[1] : null;
    setBanner(secondSellingBanner);
  }, [data]);

  return (
    <section className="product-area pt-55  pb-90 ">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title-four mb-15">
              <h4>Top Featured Products</h4>
              <button className="common-link" onClick={() => router.push("/")}>
                Deal of the day{" "}
                <i className="fa-solid fa-chevron-circle-right"></i>
              </button>
            </div>
          </div>
        </div>
        {!mount ? (
          <TopFeatureProSkeleton />
        ) : (
          <div className="row">
            {banner && (
              <div className="col-lg-6 col-12 custom-width-40 medical-pro-width">
                <div className="medical-banner medical-pro-banner mb-30">
                  <img
                    src={banner.image?.asset?.url}
                    className="img-fluid"
                    alt={banner.title}
                  />
                  <div className="medical-banner-text">
                    <h5>{banner.title}</h5>
                    <span>{banner.subtitle}</span>
                    <span className="m-price f-300">
                      ₹ {Math.floor(banner.price)}
                      <sup>.{String(banner.price).split(".")[1] || "00"}</sup>
                      {banner.originalPrice && (
                        <del>
                          ₹{Math.floor(banner.originalPrice)}
                          <sup>
                            .
                            {String(banner.originalPrice).split(".")[1] || "00"}
                          </sup>
                        </del>
                      )}
                    </span>

                    <button onClick={handleClick} className="common-link">
                      {banner.buttonText}
                      <i className="fa-solid fa-chevron-circle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {topProducts.map((product, index) => {
              const isInWishlist = wishlist?.some(
                (item) => item.product.id === product.id
              );

              return (
                <div
                  key={product._id || index}
                  className="col-lg-3 col-sm-4 col-6 custom-width-20 product-container"
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
                          paddingTop: "120%",
                          borderRadius: "4px",
                        }}
                        aria-label={product.title || ""}
                      ></div>
                      <div className="product-action text-center">
                        <button
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
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
                            onClick={() => router.push(`/shop/${product.id}`)}
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopFeaturePro;
