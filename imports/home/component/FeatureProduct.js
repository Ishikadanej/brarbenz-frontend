"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeatureProductSkeleton from "./FeatureProductSkeleton";

const FeatureProduct = ({ data }) => {
  const [banners, setBanners] = useState([]);

  const router = useRouter();

  const handleClick = (item) => {
    router.push(item.buttonLink || "/");
  };

  useEffect(() => {
    const heroSection = data?.sections?.find(
      (section) => section._type === "promoProductSection"
    );
    setBanners(heroSection?.products || []);
  }, [data]);

  return (
    <>
      {!banners.length ? (
        <FeatureProductSkeleton count={2} />
      ) : (
        <section className="banner-area banner-four">
          <div className="container">
            <div className="row">
              {banners.map((item, index) => (
                <div key={index} className="col-lg-6 col-12 custom-width-50">
                  <div className="medical-banner mb-30">
                    <div onClick={() => router.push("/shop")}>
                      <img
                        src={item.image?.asset?.url}
                        className="img-fluid"
                        alt={item.title}
                      />
                    </div>
                    <div className="medical-banner-text">
                      <h5>{item.title}</h5>
                      <span>{item.subtitle}</span>
                      <span className="m-price">
                        ₹ {Math.floor(item.price)}
                        <sup>{(item.price % 1).toFixed(2).substring(1)}</sup>
                      </span>

                      <button
                        onClick={() => handleClick(item)}
                        className="common-link"
                      >
                        {item.buttonText}
                        <i className="fa-solid fa-chevron-circle-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FeatureProduct;
