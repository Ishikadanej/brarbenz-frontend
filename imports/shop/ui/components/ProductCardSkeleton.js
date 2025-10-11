"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = ({ shop = false }) => {
  return (
    <div className={`${shop ? "col-lg-4 col-md-6 col-6" : ""}`}>
      <div className="product-wrapper mb-4">
        <div className="pro-img mb-3">
          <Skeleton height={0} style={{ paddingTop: "120%" }} />
        </div>

        <div className="pro-text">
          <div className="pro-title mb-2">
            <Skeleton width="75%" height={16} className="mb-2" />
            <Skeleton width="25%" height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
