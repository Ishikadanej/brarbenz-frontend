"use client";
import React from "react";
import Link from "next/link";

const Banner = ({ title, href, background }) => {
  return (
    <Link
      href={href}
      className="d-block w-100 text-decoration-none"
      style={{
        width: "100%",
        display: "block",
        background,
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          width: "100%",
          minHeight: "60vh",
          background: background,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
        }}
      >
        <div style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          padding: "24px 36px",
          borderRadius: 6,
        }}>
          <h2 style={{ margin: 0, fontWeight: 700, letterSpacing: 1 }}>{title}</h2>
          <p style={{ margin: 0, marginTop: 8 }}>Shop now</p>
        </div>
      </div>
    </Link>
  );
};

const ThreeCategoryBanners = ({ data }) => {
  // Pull banners from home page backend similar to HeroSection (promoBanner.banners)
  const promoSection = data?.sections?.find(
    (section) => section._type === "heroBanner"
  );

  const backendBanners = (promoSection?.banners || []).slice(0, 3).map((b) => ({
    title: b?.title || "",
    href: b?.buttonLink || (b?.title ? `/shop?category=${encodeURIComponent(b.title)}` : "/shop"),
    background: b?.image?.asset?.url
      ? `linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${b.image.asset.url}')`
      : b?.backgroundColor || "linear-gradient(135deg, #0d6efd, #6610f2)",
  }));

  const fallbackBanners = [
    {
      title: "Men",
      href: "/shop?category=Men",
      background: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
    {
      title: "Women",
      href: "/shop?category=Women",
      background: "linear-gradient(135deg, #d63384, #fd7e14)",
    },
    {
      title: "Kids",
      href: "/shop?category=Kids",
      background: "linear-gradient(135deg, #20c997, #198754)",
    },
  ];

  const banners = backendBanners.length ? backendBanners : fallbackBanners;

  return (
    <section style={{ width: "100%", margin: 0, padding: 0 }}>
      {banners.map((b) => (
        <Banner key={b.title} title={b.title} href={b.href} background={b.background} />
      ))}
    </section>
  );
};

export default ThreeCategoryBanners;


