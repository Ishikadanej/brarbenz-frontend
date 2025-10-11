"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import ProductCard from "../../shop/ui/components/ProductCard";
import CategoryProductsSkeleton from "./skeleton/CaegoryProductSkeleton";

const CategoryProducts = ({ categoriesWithProducts }) => {
  const router = useRouter();

  const sliderRefs = useRef({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth || 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getMaxSlides = () => {
    if (windowWidth < 768 && windowWidth > 424) return 2;
    if (windowWidth <= 425) return 1;
    if (windowWidth < 990) return 3;
    return 4;
  };

  const sliderSettings = (count, maxSlides) => ({
    dots: false,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  const sections = useMemo(
    () =>
      (categoriesWithProducts ?? []).filter(
        (s) => (s?.products?.length || 0) > 0
      ),
    [categoriesWithProducts]
  );

  if (!sections.length) {
    return null;
  }

  return (
    <>
      {mounted ? (
        <div>
          {sections.map((section, sIdx) => {
            const { _id: catId, title, products = [] } = section || {};
            const id = catId ?? `cat-${sIdx}`;
            const maxSlides = getMaxSlides();
            const showSlider = products.length > maxSlides;

            return (
              <section className="product-h-two pb-60 " key={id}>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12">
                      <HeaderRow>
                        <Title className="f-700">{title}</Title>
                        {showSlider && (
                          <ArrowGroup>
                            <ArrowButton
                              type="button"
                              aria-label="Previous"
                              onClick={() =>
                                sliderRefs.current[id]?.slickPrev()
                              }
                              title="Previous"
                            >
                              <i className="fa-solid fa-arrow-left-long" />
                            </ArrowButton>
                            <ArrowButton
                              type="button"
                              aria-label="Next"
                              onClick={() =>
                                sliderRefs.current[id]?.slickNext()
                              }
                              title="Next"
                            >
                              <i className="fa-solid fa-arrow-right-long" />
                            </ArrowButton>
                          </ArrowGroup>
                        )}
                      </HeaderRow>
                    </div>
                  </div>

                  <div className="row product-active">
                    <div className="col-sm-12">
                      {showSlider ? (
                        <Slider
                          key={windowWidth}
                          ref={(el) => (sliderRefs.current[id] = el)}
                          {...sliderSettings(products.length, maxSlides)}
                          className="product-active"
                        >
                          {products.map((product, index) => (
                            <Product key={product?.id ?? `${id}-${index}`}>
                              <div style={{ padding: "0 10px" }}>
                                <ProductCard
                                  product={product}
                                  router={router}
                                />
                              </div>
                            </Product>
                          ))}
                        </Slider>
                      ) : (
                        <FlexGrid>
                          {products.map((product, index) => (
                            <Product
                              key={product?.id ?? `${id}-${index}`}
                              style={{
                                flex: `0 0 calc(${100 / maxSlides}% - 20px)`,
                              }}
                            >
                              <ProductCard product={product} router={router} />
                            </Product>
                          ))}
                        </FlexGrid>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <CategoryProductsSkeleton count={sections?.length} />
      )}
    </>
  );
};

export default CategoryProducts;

const Title = styled.p`
  font-size: 34px;
  @media (max-width: 575px) {
    font-size: 20px;
    margin-bottom: 0px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 45px;
  @media (max-width: 575px) {
    padding-bottom: 20px;
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

  @media (max-width: 575px) {
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
