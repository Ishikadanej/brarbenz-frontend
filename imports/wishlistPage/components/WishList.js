"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "../../../Zustand/cartStore";
import { useCart } from "../../../hooks/useCart";
import { useRemoveFromWishlist } from "../../../hooks/useRemoveWishlist";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useRouter } from "next/navigation";
import { useWishlist } from "../../../hooks/useWishlist";
import EmptyWishlist from "./EmptyWishlist";
import WishlistSkeleton from "./WishlistSkeleton";
import styled from "styled-components";

const WishList = () => {
  const { wishlist, setWishlist, openCart } = useCartStore();

  const router = useRouter();
  const { refetch } = useCart();
  const { removeFromWishlist, isLoading: isRemoving } = useRemoveFromWishlist();
  const { addToCartMutation, isPending } = useAddToCart();
  const { data, isLoading } = useWishlist();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (data) {
      setWishlist(data);
    } else {
      setWishlist([]);
    }
  }, [data, setWishlist]);

  const handleAddToCart = (product) => {
    const firstImageUrl = product.images?.[0]?.asset?.url || null;
    const selectedSize = product.sizes?.[0]?.title || "m";

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

  const handleRemoveItem = (itemId) => {
    removeFromWishlist(itemId);
  };

  const handleImageClick = (id) => {
    router.push(`/shop/${id}`);
  };

  if (isLoading || !hydrated) {
    return <WishlistSkeleton />;
  }

  const isEmpty = !wishlist || wishlist.length === 0;

  return (
    <div>
      {isEmpty ? (
        <EmptyWishlist />
      ) : (
        <Section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="d-none d-md-block">
                  <div className="table-content table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">Images</th>
                          <th className="cart-product-name">Product</th>
                          <th className="product-price">Unit Price</th>
                          <th className="product-quantity"></th>
                          <th className="product-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlist.map((item) => (
                          <tr key={item.id}>
                            <td
                              className="product-thumbnail"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleImageClick(item.product.id)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleImageClick(item.product.id);
                                }
                              }}
                            >
                              <img
                                src={item.product.imageUrl || ""}
                                alt={item.product.title}
                                style={{ width: "80px" }}
                              />
                            </td>
                            <td className="product-name">
                              {item.product.title}
                            </td>
                            <td className="product-price">
                              ₹{item.product.price}
                            </td>
                            <td className="product-quantity">
                              <button
                                type="button"
                                className="bt-btn"
                                onClick={() => handleAddToCart(item.product)}
                                disabled={isPending}
                              >
                                {isPending ? "Adding..." : "Add To Cart"}
                              </button>
                            </td>
                            <td className="product-remove">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveItem(item.product.id)
                                }
                                disabled={isRemoving}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                  fontWeight: "700",
                                }}
                                aria-label="Remove item"
                              >
                                <i
                                  className="fa fa-times"
                                  style={{
                                    fontWeight: "900",
                                    fontSize: "16px",
                                  }}
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="d-md-none">
                  <div className="mobile-wishlist-items">
                    {wishlist.map((item) => (
                      <div key={item.id} className="mobile-wishlist-item">
                        <div className="row">
                          <div className="col-5 col-sm-3">
                            <div
                              className="mobile-product-image"
                              onClick={() => handleImageClick(item.product.id)}
                              role="button"
                              tabIndex={0}
                            >
                              <img
                                src={item.product.imageUrl || ""}
                                alt={item.product.title}
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <div className="col-7 col-sm-9">
                            <div className="mobile-product-details position-relative">
                              <button
                                type="button"
                                className="mobile-remove-btn rounded-4 border-0 position-absolute end-0 top-0"
                                onClick={() =>
                                  handleRemoveItem(item.product.id)
                                }
                                disabled={isRemoving}
                                aria-label="Remove item"
                                style={{ background: "transparent", zIndex: 1 }}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                              <h6 className="mobile-product-title mb-0 fw-bold">
                                {item.product.title}
                              </h6>
                              <p className="mobile-product-price mb-0">
                                Price: ₹{item.product.price}
                              </p>
                              <p className="item-size mb-0 mt-2 bg-body-secondary rounded-1 text-center">
                                Size: {(item.size || "").toUpperCase()}
                              </p>
                              <button
                                type="button"
                                className="mobile-add-to-cart-btn"
                                onClick={() => handleAddToCart(item.product)}
                                disabled={isPending}
                              >
                                {isPending ? "Adding..." : "Add To Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
};

export default WishList;

const Section = styled.div`
padding-top: 100px;
padding-bottom: 100px;
@media (max-width: 575px) {
  padding-top: 50px;
  padding-bottom: 50px;
}
`;