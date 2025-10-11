"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Discover = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(banner.buttonLink || "/");
  };

  const banner = data?.sections?.find(
    (section) => section._type === "promoSection"
  );

  if (!banner) return null;

  return (
    <div
      className="discover-four pt-110 pb-115"
      style={{
        backgroundImage: `url(${banner.image?.asset?.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-8 col-12 custom-width-40">
            <div className="dis-four-text">
              <div className="section-title">
                <h4 className="f-700">{banner.title}</h4>
                <p>{banner.description}</p>
              </div>

              {banner.features?.length > 0 && (
                <ul className="mb-25 row">
                  {banner.features.map((feature, index) => (
                    <li key={index} className="col-lg-6">
                      <img
                        src={feature.icon?.asset?.url}
                        alt=""
                        className="me-2"
                      />
                      {feature.text}
                    </li>
                  ))}
                </ul>
              )}

              <button onClick={handleClick} className="common-link">
                {banner.buttonText}
                <i className="fa-solid fa-chevron-circle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
