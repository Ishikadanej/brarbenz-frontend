"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import { useParams, useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import useProductsStore from "../../../Zustand/productStore";
import ProductCard from "../../shop/ui/components/ProductCard";

const ProductArea = () => {
  const { id } = useParams();
  const router = useRouter();
  const { products } = useProductsStore();

  const [windowWidth, setWindowWidth] = useState(1200);
  useEffect(() => {
    const handleResize = () =>
      setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!products?.length) return;
    const selected = products.find((p) => p.id === id);
    if (selected?.category?.title) {
      const filtered = products.filter(
        (p) =>
          p.category?.title === selected.category.title && p.id !== selected.id
      );
      setRelatedProducts(filtered);
    } else {
      setRelatedProducts([]);
    }
  }, [products, id]);

  const getMaxSlides = () => {
    if (windowWidth < 768 && windowWidth > 424) return 2;
    if (windowWidth <= 425) return 1;
    if (windowWidth < 990) return 3;
    return 4;
  };

  const maxSlides = getMaxSlides();
  const showSlider = relatedProducts.length > maxSlides;

  // ref for external arrow controls
  const sliderRef = useRef(null);

  // same settings as CategoryProducts
  const sliderSettings = (maxSlides) => ({
    dots: false,
    arrows: false, // external arrows only
    speed: 300,
    slidesToShow: maxSlides,
    slidesToScroll: maxSlides,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "60px",
          className: "center",
        },
      },
    ],
  });

  return (
    <section className="product-h-two pt-90">
      <div className="container">
        {relatedProducts.length > 0 && (
          <div className="row">
            <div className="col-sm-12">
              <HeaderRow>
                <div className="section-title  md:text-left pb-0">
                  <h4>Related Products</h4>
                  <span>
                    Street art salvia irony wolf waistcoat actually lomo meh fap
                    jean.
                  </span>
                </div>
              </HeaderRow>
            </div>
          </div>
        )}

        <div className="row product-active">
          <div className="col-sm-12">
            {relatedProducts.length > 0 &&
              (showSlider ? (
                <>
                  <Slider
                    ref={sliderRef}
                    {...sliderSettings(maxSlides)}
                    className="product-active"
                  >
                    {relatedProducts.map((product, index) => (
                      <Product key={product.id || index}>
                        <div style={{ padding: "0 10px" }}>
                          <ProductCard product={product} router={router} />
                        </div>
                      </Product>
                    ))}
                  </Slider>

                  <div className="d-flex justify-content-center">
                    {showSlider && (
                      <ArrowGroup>
                        <ArrowButton
                          type="button"
                          aria-label="Previous"
                          title="Previous"
                          onClick={() => sliderRef.current?.slickPrev()}
                        >
                          <i className="fa-solid fa-arrow-left-long" />
                        </ArrowButton>
                        <ArrowButton
                          type="button"
                          aria-label="Next"
                          title="Next"
                          onClick={() => sliderRef.current?.slickNext()}
                        >
                          <i className="fa-solid fa-arrow-right-long" />
                        </ArrowButton>
                      </ArrowGroup>
                    )}
                  </div>
                </>
              ) : (
                <FlexGrid>
                  {relatedProducts.map((product, index) => (
                    <Product
                      key={product.id || index}
                      style={{ flex: `0 0 calc(${100 / maxSlides}% - 20px)` }}
                    >
                      <ProductCard product={product} router={router} />
                    </Product>
                  ))}
                </FlexGrid>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductArea;

/* ===== Styled: header + external arrows + grid fallback ===== */

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 45px;

  .section-title h4 {
    margin-bottom: 6px;
  }
`;

const ArrowGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const ArrowButton = styled.button`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  padding: 8px 10px;
  line-height: 1;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    min-width: unset;
    min-height: unset;
    padding: 6px;
  }
`;

const Product = styled.div`
  max-width: 385px;
  width: 100%;
`;

const FlexGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;
