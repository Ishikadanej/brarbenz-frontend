import React from "react";

const GetConsultant = ({ details }) => {
  const consultSection = details?.sections?.find(
    (section) => section._type === "getConsultant"
  );

  return (
    <section
      className="cta-area pos-rel pt-115 pb-120"
      style={{
        backgroundImage: `url(${consultSection?.backgroundImage?.asset?.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="cta-text text-center">
              <div className="section-title section-title-white text-center mb-40">
                <span>{consultSection?.subtitle}</span>
                <h4>{consultSection?.title}</h4>
              </div>
              <div className="section-button">
                <a href="appoinment.html" className="bt-btn bt-btn-white">
                  {consultSection?.buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetConsultant;
