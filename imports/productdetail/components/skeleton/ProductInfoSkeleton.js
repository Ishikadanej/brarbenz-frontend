import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import { Heart, Share2 } from "lucide-react";

const ProductInfoSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <section className="product-details-area pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="pro-details-tab d-flex gap-4">
              <ul className="nav d-flex flex-sm-column flex-row gap-sm-3 nav custom-tab">
                {[1, 2, 3, 4].map((i) => (
                  <li
                    className="nav-item  skeleton-side-image "
                    key={i}
                    style={{ listStyle: "none" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        // width: "100%",
                        paddingTop: "100%",
                      }}
                    >
                      <Skeleton
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="tab-content flex-grow-1 w-100">
                <div
                  style={{
                    width: "100%",
                    paddingTop: "95%",
                    position: "relative",
                  }}
                >
                  <Skeleton
                    style={{
                      borderRadius: "8px",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="pro-details-content mt-15">
              {/* Title Skeleton */}
              <h4>
                <Skeleton height={30} width="50%" className="mb-1" />
              </h4>

              {/* Rating Skeleton */}
              <div className="details-rating mb-10">
                {[...Array(5)].map((_, i) => (
                  <a key={i}>
                    <i className="fas fa-star"></i>
                  </a>
                ))}
                <span>(23 Customer Review)</span>
              </div>

              {/* Price Skeleton */}
              <div className="details-pro-price mb-40">
                <Skeleton width={100} height={20} />
              </div>

              {/* Description Skeleton */}
              <p>
                <Skeleton height={16} width="90%" className="mb-1" />
                <Skeleton height={16} width="85%" className="mb-1" />
                <Skeleton height={16} width="80%" className="mb-1" />
              </p>

              {/* Quantity & Add to Cart Skeleton */}
              <div className="pro-quan-area mb-55">
                <div className="product-quantity">
                  <div className="cart-plus-minus">
                    <span className="qtybutton dec">-</span>
                    <input type="text" value={0} readOnly />
                    <span className="qtybutton inc">+</span>
                  </div>
                </div>
                <div className="pro-cart-btn ">
                  <button disabled>Add to cart</button>
                </div>

                {/* Wishlist & Share Buttons */}
                <div className="pro-wish ">
                  <button>
                    <Heart className=" cursor-pointer" />
                  </button>
                  <button>
                    <Share2 />
                  </button>
                </div>
              </div>

              {/* Stock Information Skeleton */}
              <div className="stock-update">
                <div className="stock-list">
                  <ul>
                    {/* Stock */}
                    <li>
                      <span>Stock :</span>{" "}
                      <span>
                        <Skeleton width={80} height={16} />
                      </span>
                    </li>

                    {/* SKU */}
                    <li>
                      <span>SKU :</span>{" "}
                      <span className="s-text">
                        <Skeleton width={100} height={16} />
                      </span>
                    </li>

                    {/* Category */}
                    <li>
                      <span>Category :</span>{" "}
                      <span className="s-text">
                        <Skeleton width={120} height={16} />
                      </span>
                    </li>

                    {/* Tags */}
                    <li>
                      <span>Tag :</span>{" "}
                      <span className="s-text">
                        <Skeleton width={100} height={16} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoSkeleton;
