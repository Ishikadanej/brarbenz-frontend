"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useIsMobile } from "../../../hooks/useIsMobile";

const FeatureProductSkeleton = ({ count }) => {
  const isMobile = useIsMobile();
  return (
    <section className="banner-area banner-four">
      <div className="container">
        <div className="row">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="col-lg-6 col-12 custom-width-50">
              <div
                className="medical-banner mb-30 bg-light d-flex align-items-center"
                style={{ height: isMobile ? "250px" : "300px" }}
              >
                <div
                  className="medical-banner-texts "
                  // style={{ padding: "70px 320px 0px 50px" }}
                  style={{ paddingLeft: isMobile ? "35px" : "50px" }}
                >
                  <Skeleton width={300} className="mb-lg-3 mb-2" />
                  <Skeleton width={250} className="mb-lg-5 mb-3" />
                  <Skeleton width={60} className="mb-lg-3 mb-2" />
                  <button className="common-link ">
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
