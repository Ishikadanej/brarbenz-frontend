"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeatureProductSkeleton = () => {
  return (
    <section className="banner-area banner-four">
      <div className="container">
        <div className="row">
          {[1, 2].map((_, index) => (
            <div key={index} className="col-lg-6 col-12 custom-width-50">
              <div className="mb-30 p-3 bg-light rounded">
                <div>
                  <Skeleton height={300} width="100%" />
                </div>
                <div className="mt-3">
                  <h5>
                    <Skeleton width="60%" />
                  </h5>
                  <span>
                    <Skeleton width="40%" />
                  </span>
                  <span className="m-price d-block my-2">
                    <Skeleton width="30%" />
                  </span>
                  <button className="common-link">
                    <Skeleton width={120} height={30} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProductSkeleton;
