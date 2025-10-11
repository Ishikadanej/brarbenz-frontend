import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useIsMobile } from "../../../../hooks/useIsMobile";

const BestSellingProductsSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <section className="product-area px-0">
      <div className="container">
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="col-lg-3 col-sm-4 col-6 custom-width-20 product-container"
            >
              <div className="product-wrapper mb-40">
                <div className="pro-img mb-20">
                  <Skeleton
                    style={{
                      borderRadius: "4px",
                      width: "100%",
                      paddingTop: "130%",
                    }}
                  />
                </div>
                <div className="pro-text">
                  <Skeleton height={18} width="80%" className="mb-2" />
                  <Skeleton height={20} width="50%" />
                </div>
              </div>
            </div>
          ))}

          {/* Right side banner */}
          <div className="col-lg-6 col-12 custom-width-40 medical-pro-width">
            <div
              className="medical-banner medical-pro-banner mb-30 position-relative bg-light  "
              style={{
                borderRadius: "6px",
                minHeight: isMobile ? "450px" : "400px",
                padding: "80px 200px 0px 40px",
              }}
            >
              <Skeleton height={22} width="80%" className="mb-1" />
              <Skeleton height={22} width="60%" className="mb-3" />

              <Skeleton height={18} width="40%" className="mb-4" />
              <Skeleton height={25} width="80%" className="mb-4" />
              <Skeleton height={25} width="50%" className="mb-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellingProductsSkeleton;
