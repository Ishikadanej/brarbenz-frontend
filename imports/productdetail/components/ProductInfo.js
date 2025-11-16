"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import useCartStore from "../../../Zustand/cartStore";
import useProductsStore from "../../../Zustand/productStore";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useCart } from "../../../hooks/useCart";
import { addToRecentViewtApi } from "../api/api";
import { useWishlist } from "../../../hooks/useWishlist";
import { useAddToWishlist } from "../../../hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "../../../hooks/useRemoveWishlist";
import Cookies from "js-cookie";
import { useAuth } from "../../../hooks/useAuth";
import { Heart, Share2 } from "lucide-react";
import ImageZoom from "./ZoomImage";
import ProductInfoSkeleton from "./skeleton/ProductInfoSkeleton";
import styled from "styled-components";
import ProductDes from "./ProductDes";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { products } = useProductsStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [localQuantity, setLocalQuantity] = useState(1);
  const { addToCartMutation } = useAddToCart();
  const { openCart, wishlist, addToCart } = useCartStore();
  const { refetch } = useCart();
  const { addToWishlistMutation } = useAddToWishlist();
  const { refetch: wishlistRefetch } = useWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const token = Cookies.get("token");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!id || products.length === 0) return;
      try {
        const selectedProduct = products?.find((p) => p.id === id);
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      }
    };

    if (id) fetchData();
  }, [id, products]);

  useEffect(() => {
    if (!product) return;

    if (product?.sizes?.length > 0 && product.sizes[0]?.images?.length > 0) {
      const defaultSizeImage = product.sizes[0].images[0]?.asset?.url;
      setMainImage(defaultSizeImage);
      setSelectedSizeIndex(0);
      setSelectedImageIndex(0);
      return;
    }

    if (product?.images?.length > 0) {
      setMainImage(product.images[0]?.asset?.url);
      setSelectedImageIndex(0);
      setSelectedSizeIndex(null);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    const selectedSizeObj =
      product.sizes?.length > 0 && selectedSizeIndex !== null
        ? product.sizes[selectedSizeIndex]
        : null;

    const sizeTitle = selectedSizeObj?.title || "m";
    const sizeImageUrl =
      selectedSizeObj?.images?.length > 0
        ? selectedSizeObj.images[0]?.asset?.url
        : product.images?.[0]?.asset?.url || null;

    const productPayload = {
      productId: product.id,
      productName: product.title,
      productImage: sizeImageUrl,
      size: sizeTitle,
      quantity: localQuantity,
      price: product.price,
    };

    if (!token || !user) {
      addToCart({ ...product, size: sizeTitle, quantity: localQuantity });
      openCart();
      return;
    }

    addToCartMutation(productPayload, {
      onSuccess: () => {
        openCart();
        refetch?.();
        // setLocalQuantity(1);
      },
    });
  };


  const handleBuyNow = () => {
    if (!product) return;

    const selectedSizeObj =
      product.sizes?.length > 0 && selectedSizeIndex !== null
        ? product.sizes[selectedSizeIndex]
        : null;

    const sizeTitle = selectedSizeObj?.title || "m";
    const sizeImageUrl =
      selectedSizeObj?.images?.length > 0
        ? selectedSizeObj.images[0]?.asset?.url
        : product.images?.[0]?.asset?.url || null;

    const productPayload = {
      productId: product.id,
      productName: product.title,
      productImage: sizeImageUrl,
      size: sizeTitle,
      quantity: localQuantity,
      price: product.price,
    };

    // IF NOT LOGGED IN → add to local cart
    if (!token || !user) {
      addToCart({ ...product, size: sizeTitle, quantity: localQuantity });
      router.push("/checkout"); // ✔️ direct checkout
      return;
    }

    // LOGGED-IN → add to DB cart
    addToCartMutation(productPayload, {
      onSuccess: () => {
        refetch?.(); // optionally refresh cart count
        router.push("/checkout"); // ✔️ direct checkout
      },
    });
  };

  const isInWishlist = wishlist?.some((item) => item.product.id === id);

  const handleAddtoWishlist = () => {
    if (!product) return;

    const selectedSizeObj =
      product.sizes?.length > 0 && selectedSizeIndex !== null
        ? product.sizes[selectedSizeIndex]
        : null;

    const sizeImageUrl =
      selectedSizeObj?.images?.length > 0
        ? selectedSizeObj.images[0]?.asset?.url
        : null;

    const sizeTitle = selectedSizeObj?.title || "m";
    const productPayload = {
      productId: product.id,
      productName: product.title,
      productImage: sizeImageUrl,
      size: sizeTitle,
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

  const getCurrentThumbnails = () => {
    if (
      product?.sizes?.length > 0 &&
      selectedSizeIndex !== null &&
      product.sizes[selectedSizeIndex]?.images?.length > 0
    ) {
      return product.sizes[selectedSizeIndex].images;
    }
    if (product?.images?.length > 0) {
      return product.images;
    }
    return [];
  };

  const calledRef = useRef(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!id || calledRef.current || !token) return;

    calledRef.current = true;

    const addRecent = async () => {
      try {
        const res = await addToRecentViewtApi({ id });
      } catch (err) {
        console.error("Failed to add recent view:", err);
      }
    };

    addRecent();
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check this out!",
          url,
        });
      } catch (err) {
        console.error("Share canceled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Copy failed:", err);
        alert("Failed to copy link.");
      }
    }
  };

  return (
    <>
      {!product ? (
        <ProductInfoSkeleton />
      ) : (
        <Section>
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="pro-details-tab">
                  <ul className="nav custom-tab" role="tablist">
                    {getCurrentThumbnails().map((imgObj, index) => (
                      <li className="nav-item" key={index}>
                        <button
                          className={`nav-link ${index === selectedImageIndex ? "active" : ""
                            }`}
                          onClick={() => {
                            setSelectedImageIndex(index);
                            setMainImage(imgObj.asset?.url);
                          }}
                          style={{
                            opacity: index === selectedImageIndex ? 0.7 : 1,
                            padding: 0,
                          }}
                        >
                          <img
                            src={imgObj.asset?.url}
                            className="img-fluid"
                            alt={product?.title || "Product Thumbnail"}
                            style={{
                              opacity: index === selectedImageIndex ? 0.7 : 1,
                            }}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="tab-content custom-content">
                    {mainImage && (
                      <div className="tab-pane fade show active">
                        <ImageZoom
                          src={mainImage}
                          alt={product?.title || "Product Image"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="pro-details-content mt-15">
                  <h4>{product?.title}</h4>

                  <div className="details-rating mb-10">
                    {[...Array(5)].map((_, i) => (
                      <a key={i}>
                        <i className="fas fa-star"></i>
                      </a>
                    ))}
                    <span>(23 Customer Review)</span>
                  </div>

                  <span className="details-pro-price mb-40">
                    ₹{product?.price ?? "N/A"} - ₹
                    {product?.originalPrice ?? "N/A"}
                  </span>

                  <p>{product?.description || "No description available."}</p>

                  {product?.sizes?.length > 0 && (
                    <div className="size-wrapper mb-35">
                      <div className="size-text">
                        <span>Select Size :</span>
                      </div>
                      <div className="sizes">
                        {product.sizes.map((size, idx) => (
                          <span
                            key={idx}
                            onClick={() => {
                              if (size.images?.length > 0) {
                                const sizeImageUrl = size.images[0]?.asset?.url;
                                if (sizeImageUrl) {
                                  setMainImage(sizeImageUrl);
                                  setSelectedSizeIndex(idx);
                                  setSelectedImageIndex(0);
                                }
                              }
                            }}
                            style={{
                              borderBottom:
                                idx === selectedSizeIndex
                                  ? "1px solid #000"
                                  : "1px solid transparent",
                              color:
                                idx === selectedSizeIndex ? "#000" : "#565656",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          >
                            {size.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="d-flex flex-column gap-4">
                    <div className="pro-quan-area">
                      <div className="product-quantity">
                        <div className="cart-plus-minus">
                          <span
                            className="qtybutton dec"
                            onClick={() =>
                              setLocalQuantity((q) => (q > 1 ? q - 1 : 1))
                            }
                          >
                            -
                          </span>
                          <input type="text" value={localQuantity} readOnly />
                          <span
                            className="qtybutton inc"
                            onClick={() => setLocalQuantity((q) => q + 1)}
                          >
                            +
                          </span>
                        </div>
                      </div>


                      <div className="pro-wish ">
                        {token && (
                          <button
                            onClick={() => handleAddtoWishlist(product)}
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            disabled={!token}
                          >
                            <Heart
                              className=" cursor-pointer"
                              fill={isInWishlist ? "red" : "none"}
                              stroke={isInWishlist ? "red" : "gray"}
                            />
                          </button>
                        )}
                        <button onClick={handleShare}>
                          <Share2 />
                        </button>
                      </div>
                    </div>
                    <CartBtnWrapper>
                      <CartButton
                        onClick={handleAddToCart}
                        disabled={!product?.inStock}
                      >
                        Add to cart
                      </CartButton>

                      <CartButton
                        onClick={handleBuyNow}
                        disabled={!product?.inStock}
                      >
                        Buy Now
                      </CartButton>
                    </CartBtnWrapper>
                  </div>


                  <div className="stock-update">
                    <div className="stock-list">
                      <ul>
                        <li>
                          <span>Stock :</span>{" "}
                          <span
                            className={`s-text ${product?.inStock ? "green" : "red"
                              }`}
                          >
                            {product?.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </li>
                        <li>
                          <span>SKU :</span>{" "}
                          <span className="s-text">
                            {product?.sku || "N/A"}
                          </span>
                        </li>
                        <li>
                          <span>Category :</span>{" "}
                          <span className="s-text">
                            {Array.isArray(product?.categories)
                              ? product.categories
                                .map((cat) => cat.title)
                                .join(", ")
                              : product?.categories || "N/A"}
                          </span>
                        </li>
                        <li>
                          <span>Tag :</span>{" "}
                          <span className="s-text">
                            {Array.isArray(product?.tags)
                              ? product.tags.map((tag) => tag.title).join(", ")
                              : product?.tags || "N/A"}
                          </span>
                        </li>
                      </ul>
                      <div
                        className="d-flex justify-content-between align-items-center text-center my-4"
                        style={{ maxWidth: "800px", margin: "0 auto" }}
                      >
                        {/* Free Delivery */}
                        <div>
                          <i className="fa-solid fa-truck-fast" style={{ fontSize: "30px", color: "#000" }}></i>
                          <p className="mt-2 mb-0" style={{ fontSize: "14px", color: "#000" }}>Free Delivery</p>
                        </div>

                        {/* Secure Checkout */}
                        <div>
                          <i className="fa-solid fa-shield-halved" style={{ fontSize: "30px", color: "#000" }}></i>
                          <p className="mt-2 mb-0" style={{ fontSize: "14px", color: "#000" }}>Secure Checkout</p>
                        </div>

                        {/* Easy Return */}
                        <div>
                          <i className="fa-solid fa-rotate-left" style={{ fontSize: "30px", color: "#000" }}></i>
                          <p className="mt-2 mb-0" style={{ fontSize: "14px", color: "#000" }}>24-Hour Return Window</p>
                        </div>
                      </div>
                      <ProductDes productId={id} />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
    </>
  );
};

export default ProductInfo;


const Section = styled.div`
padding-top: 50px;
padding-bottom: 70px;
@media (max-width: 575px) {
  padding-top: 30px;
  padding-bottom: 50px;
}
`;

const CartBtnWrapper = styled.div`
  display: flex;
  gap: 10px;
//   margin-left: 10px;
//   @media (max-width: 768px) {
//     margin-left: 0px;
// }
`;

const CartButton = styled.button`
  line-height: 51px;
  padding: 0px 60px;
  color: #fff;
  font-weight: 800;
  font-size: 12px;
  background: #000;
  display: inline-block;
  text-align: center;
  border: none;
  text-transform: uppercase;
  cursor: pointer;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  @media (max-width: 1500px) {
    padding: 0px 30px;
  }

  // @media (max-width: 1088px) {
  //   margin-left: 10px;
  // }

  @media (max-width: 900px) {
    padding: 10px 20px;
    line-height: 28px;
  }

//   @media (max-width: 768px) {
//     margin-left: 0px;  
// }
  @media (max-width: 600px) {
    line-height: 36px;
    padding: 0px 50px;
  }
    @media (max-width: 400px) {
    padding: 0px 20px;
}
`;
