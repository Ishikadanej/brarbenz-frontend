"use client";
import React from "react";
import ProductCardSkeleton from "../../../shop/ui/components/ProductCardSkeleton";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const CategoryProductsSkeleton = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, sIdx) => (
        <section className="product-h-two pb-60" key={sIdx}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <HeaderRow>
                  <Skeleton
                    height={32}
                    width={200}
                    borderRadius={6}
                    style={{ marginBottom: "1rem" }}
                  />

                  {/* <ArrowGroup>
                    <Skeleton width={36} height={36} />
                    <Skeleton width={36} height={36} />
                  </ArrowGroup> */}
                </HeaderRow>
              </div>
            </div>

            <div className="row product-active">
              <div className="col-sm-12 d-flex gap-3 flex-wrap mt-5 ">
                {[...Array(4)].map((_, index) => (
                  <div key={index} style={{ flex: "0 0 calc(25% - 15px)" }}>
                    <ProductCardSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default CategoryProductsSkeleton;

const ArrowGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 575px) {
    padding-bottom: 20px;
  }
`;
