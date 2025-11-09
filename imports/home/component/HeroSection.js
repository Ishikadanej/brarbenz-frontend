"use client";
import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../public/css/animate.min.css";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const HeroSection = ({ data }) => {
  const [slides, setSlides] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!data) return;

    console.log("🔥 HeroSection incoming data:", data);
    const heroSection = data?.sections?.find(
      (section) => section._type === "heroBanner"
    );
    const promoSection = data?.sections?.find(
      (section) => section._type === "promoBanner"
    );

    setSlides(heroSection?.slides || []);
    setBanners(promoSection?.banners || []);
  }, [data]);

  // Client-side width detection to avoid CSS/SSR display mismatch
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // run once and set mounted flag
    handleResize();
    setMounted(true);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (link) => {
    if (link) router.push(link);
  };

  return (
    <>
      {/* Desktop / Tablet View - render only when not mobile */}
      {!isMobile && (
        <HeroSections className="desktop-view">
          {slides.map((slide, index) => (
            <HeroSlide
              key={index}
              onClick={() => handleClick(slide?.ctaLink)}
              background={slide?.image?.asset?.url}
              style={{ cursor: slide?.ctaLink ? "pointer" : "default" }}
            />
          ))}
        </HeroSections>
      )}

      {/* Mobile View (show only on mobile widths) */}
      {mounted && isMobile && (
        <PromoSections className="mobile-view">
          {banners.map((banner, index) => (
            <PromoBanner key={index} onClick={() => handleClick(banner.buttonLink)}>
              <img src={banner?.image?.asset?.url} alt={`Promo banner ${index + 1}`} loading="lazy" />
            </PromoBanner>
          ))}
        </PromoSections>
      )}
    </>
  );
};

export default HeroSection;

const HeroSections = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* Hide on mobile + tablet */
  @media (max-width: 1024px) {
    display: none;
  }
`;

const HeroSlide = styled.div`
  position: relative;
  width: 100%;
  color: #fff;
  text-align: left;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  &::after {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const PromoSections = styled.div`
  display: none;

  /* Show only on mobile + tablet */
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const PromoBanner = styled.div`
  cursor: pointer;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.03);
    }
  }
`;
