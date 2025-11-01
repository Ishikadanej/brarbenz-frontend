import React from "react";

const FeturesArea = ({ data }) => {
  const featureSection = data?.sections?.find(
    (section) => section._type === "featureSection"
  );

  return (
    <section className="features-area gray-bg features-area-border p-relative pb-70 box-105">
      <div className="container features__wrapper">
        <div className="row">
          <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <div className="section-title text-center mb-40">
              <span>{featureSection?.subtitle}</span>
              <h4>{featureSection?.title}</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="features__item d-flex white-bg transition-3 border-radius-8 box-shadow mb-30">
              <div className="features__icon">
                <i className="fa-solid fa-shipping-fast"></i>
              </div>
              <div className="features__content">
                <h3>{featureSection?.features?.[0].title}</h3>
                <p>{featureSection?.features?.[0].description}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="features__item d-flex white-bg transition-3 border-radius-8 box-shadow mb-30">
              <div className="features__icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="features__content">
                <h3>{featureSection?.features?.[1].title}</h3>
                <p>{featureSection?.features?.[1].description}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="features__item d-flex white-bg transition-3 border-radius-8 box-shadow mb-30">
              <div className="features__icon">
                <i className="fa-solid fa-undo-alt"></i>
              </div>
              <div className="features__content">
                <h3>{featureSection?.features?.[2].title}</h3>
                <p>{featureSection?.features?.[2].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeturesArea;
