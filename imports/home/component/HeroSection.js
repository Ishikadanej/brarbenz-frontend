"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../public/css/animate.min.css";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import HeroSectionSkeleton from "./skeleton/HeroSectionSkeleton";

const HeroSection = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [banners, setBanners] = useState([]);
  const router = useRouter();
  const bannerRefs = useRef([]);
  const [bannerHeight, setBannerHeight] = useState(0);
  const mobileBannerRefs = useRef([]);
  const [mobileBannerHeight, setMobileBannerHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileBannerRefs.current[0]) {
      const observer = new ResizeObserver(() => {
        const height = mobileBannerRefs.current[0].offsetHeight;
        setMobileBannerHeight(height);
      });
      observer.observe(mobileBannerRefs.current[0]);
      return () => observer.disconnect();
    }
  }, [banners]);

  useEffect(() => {
    if (bannerRefs.current[0]) {
      const img = bannerRefs.current[0].querySelector("img");
      if (img && !img.complete) {
        img.onload = () => {
          const height = bannerRefs.current[0].offsetHeight;
          setBannerHeight(height);
        };
      } else {
        const height = bannerRefs.current[0].offsetHeight;
        setBannerHeight(height);
      }
    }
  }, [banners]);

  useEffect(() => {
    if (!data) return;

    const heroSection = data?.sections?.find(
      (section) => section._type === "heroBanner"
    );
    const promoSection = data?.sections?.find(
      (section) => section._type === "promoBanner"
    );
    setSlides(heroSection?.slides || []);
    setBanners(promoSection?.banners || []);
  }, [data]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    fade: true,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  const handleClick = (link) => {
    if (link) router.push(link);
  };

  return (
    <>
      {!mounted || !data || data.length === 0 ? (
        <HeroSectionSkeleton />
      ) : (
        <section className="hero-area position-relative ">
          <div className="slider-four">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-12 custom-width-70">
                  <Slider
                    {...sliderSettings}
                    className="slider-active slider-active-four common-dots"
                  >
                    {slides.map((slide, index) => (
                      <SlideWrapper
                        key={index}
                        background={slide?.image?.asset?.url}
                        className="d-flex align-items-center"
                      >
                        <div className="hero-caption-four">
                          <div
                            className={`sli-offer mb-15 ${
                              activeSlide === index ? "fadeInUp" : ""
                            }`}
                            style={{ animationDelay: "0.4s" }}
                          >
                            <span>{slide.discount || "-28%"}</span>
                            <span>{slide.label || "Hot"}</span>
                          </div>
                          <h2
                            className={`${
                              activeSlide === index ? "fadeInUp" : ""
                            }`}
                            style={{ animationDelay: "0.4s" }}
                          >
                            {slide.title}
                          </h2>
                          <p
                            className={`${
                              activeSlide === index ? "fadeInUp" : ""
                            }`}
                            style={{ animationDelay: "0.6s" }}
                          >
                            {slide.subtitle}
                          </p>

                          <button
                            onClick={() => handleClick(slide.ctaLink)}
                            className={`common-link ${
                              activeSlide === index ? "fadeInUp" : ""
                            }`}
                            style={{ animationDelay: "0.8s" }}
                          >
                            {slide.ctaText || "Start Shopping"}{" "}
                            <i className="fas fa-chevron-circle-right"></i>
                          </button>
                        </div>
                      </SlideWrapper>
                    ))}
                  </Slider>
                </div>

                {/* Right: Desktop Banners */}
                <div className="col-lg-4 custom-width-30 d-none d-lg-block">
                  <Grid>
                    <Banner
                      ref={(el) => (bannerRefs.current[0] = el)}
                      image={banners?.[0]?.image?.asset?.url}
                      title={banners?.[0]?.title}
                      subtitle={banners?.[0]?.subtitle}
                      link={banners?.[0]?.ctaLink}
                      onClick={handleClick}
                      fixedHeight={bannerHeight}
                    />
                    <Banner
                      ref={(el) => (bannerRefs.current[1] = el)}
                      image={banners?.[1]?.image?.asset?.url}
                      title={banners?.[1]?.title}
                      subtitle={banners?.[1]?.subtitle}
                      link={banners?.[1]?.ctaLink}
                      onClick={handleClick}
                      fixedHeight={bannerHeight}
                    />
                  </Grid>
                </div>
              </div>

              {/* Mobile Banners */}
              <div className="row">
                <div className="col-md-6 d-md-block d-lg-none">
                  <MobileBanner
                    ref={(el) => (mobileBannerRefs.current[0] = el)}
                    image={banners?.[0]?.image?.asset?.url}
                    title={banners?.[0]?.title}
                    subtitle={banners?.[0]?.subtitle}
                    link={banners?.[0]?.ctaLink}
                    isMobile
                    fixedHeight={mobileBannerHeight}
                    onClick={handleClick}
                  />
                </div>
                <div className="col-md-6 d-md-block d-lg-none">
                  <MobileBanner
                    ref={(el) => (mobileBannerRefs.current[1] = el)}
                    image={banners?.[1]?.image?.asset?.url}
                    title={banners?.[1]?.title}
                    subtitle={banners?.[1]?.subtitle}
                    link={banners?.[1]?.ctaLink}
                    isMobile
                    fixedHeight={mobileBannerHeight}
                    onClick={handleClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;

const SlideWrapper = styled.div`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 620px;

  @media (min-width: 1200px) and (max-width: 1500px) {
    min-height: 515px;
  }
  @media (max-width: 1200px) {
    min-height: 425px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const MobileBanner = React.forwardRef(
  ({ image, title, subtitle, link, isMobile, fixedHeight, onClick }, ref) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
      <div ref={ref} className={`sli-banner ${isMobile ? "mt-30" : "mb-30"}`}>
        <img
          src={image}
          className="img-fluid"
          alt={title}
          onLoad={() => setImgLoaded(true)}
          style={fixedHeight && imgLoaded ? { height: `${fixedHeight}px` } : {}}
        />
        <div className="sli-banner-text">
          <h5 className="f-700">{title}</h5>
          <span>{subtitle}</span>
          <button
            onClick={() => onClick(link)}
            className="common-link"
            style={{ background: "transparent", border: "none" }}
          >
            buy now <i className="fas fa-chevron-circle-right"></i>
          </button>
        </div>
      </div>
    );
  }
);

const Banner = React.forwardRef(
  ({ image, title, subtitle, link, isMobile, fixedHeight, onClick }, ref) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
      <div ref={ref} className={`sli-banner ${isMobile ? "mt-30" : "mb-30"}`}>
        <img
          src={image}
          className="img-fluid"
          alt={title}
          onLoad={() => setImgLoaded(true)}
          style={fixedHeight && imgLoaded ? { height: `${fixedHeight}px` } : {}}
        />
        <div className="sli-banner-text">
          <h5 className="f-700">{title}</h5>
          <span>{subtitle}</span>
          <button
            onClick={() => onClick(link)}
            className="common-link"
            style={{ background: "transparent", border: "none" }}
          >
            buy now <i className="fas fa-chevron-circle-right"></i>
          </button>
        </div>
      </div>
    );
  }
);
