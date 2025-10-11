"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FiltersPanelSkeleton = () => {
  return (
    <>
      <div className="side-cat mb-45 ">
        <div className="d-flex gap-4 justify-content-md-between align-items-md-start justify-content-end">
          <h6 className="cat-title pb-20">Filters</h6>
        </div>

        <h6 className="cat-title pb-20">Categories</h6>

        <ul>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <li key={index}>
              <Skeleton width="60%" height={20} className="mb-2" />
            </li>
          ))}
        </ul>
      </div>

      <div className="slider-range mb-40">
        <div className="cat-title mb-30">
          <h6>Filter By Price</h6>
        </div>

        <Skeleton width="100%" height={40} />
      </div>

      <div className="side-tag mb-50">
        <h6 className="cat-title pb-20">Size</h6>

        <ul className="d-flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <li key={index}>
              <Skeleton width={50} height={30} />
            </li>
          ))}
        </ul>
      </div>

      <div className="side-product mb-50">
        <h6 className="cat-title pb-20">Recent Products</h6>

        {[1, 2, 3, 4, 5].map((_, index) => (
          <div className="side-pro-wrapper mb-20 d-flex" key={index}>
            <div className="side-pro-img mr-3">
              <Skeleton width={80} height={80} />
            </div>
            <div className="side-pro-text">
              <Skeleton width={120} height={20} className="mb-2" />
              <Skeleton width={80} height={20} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FiltersPanelSkeleton;
