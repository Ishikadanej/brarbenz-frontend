import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useIsMobile } from "../../../../hooks/useIsMobile";

const HeroSectionSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <section className="hero-area position-relative">
      <div className="slider-four">
        <div className="container">
          <div className="row">
            {/* Main Slider Skeleton */}
            <div className="col-lg-9 col-12 custom-width-70  w-100 d-flex flex-column justify-content-center">
              <div className="h-100 d-flex bg-light d-flex align-items-center w-100">
                <div
                  className=" hero-caption-four w-100 d-flex flex-column justify-content-center pr-5"
                  style={{ height: isMobile ? "420px" : "620px" }}
                >
                  <div className="d-flex gap-2 mb-3">
                    <Skeleton height={30} width={50} />
                    <Skeleton height={30} width={130} />
                  </div>
                  <div className="d-flex flex-column">
                    <Skeleton
                      height={30}
                      width="100%"
                      className="mb-lg-2 mb-1"
                    />
                    <Skeleton
                      height={30}
                      width="25%"
                      className="mb-lg-5 mb-2"
                    />
                    <Skeleton height={20} width="100%" className="mb-lg-2" />
                    <Skeleton
                      height={20}
                      width="40%"
                      className="mb-lg-5 mb-2"
                    />
                    <Skeleton height={40} width={100} />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Banners */}
            <div className="col-lg-4 d-none d-lg-block custom-width-30">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  style={{ height: "300px" }}
                  className="mb-3 ps-2 bg-light sli-banner d-flex align-items-center"
                >
                  <div className="d-flex flex-column col-12">
                    <Skeleton height={25} width="70%" className="mb-4" />
                    <Skeleton height={20} width="50%" className="mb-4" />
                    <Skeleton height={20} width="50%" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Banners */}
          <div className="row mt-4 d-lg-none">
            {[1, 2].map((i) => (
              <div key={i} className="col-md-6 mt-md-0 mt-4">
                <div
                  className="bg-light sli-banner d-flex align-items-center p-3"
                  style={{ height: "250px" }}
                >
                  <div className="d-flex flex-column col-12">
                    <Skeleton height={25} width="70%" className="mb-4" />
                    <Skeleton height={20} width="50%" className="mb-2" />
                    <Skeleton height={20} width="50%" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton;
