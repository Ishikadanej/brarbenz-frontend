import React from "react";

const HeroAbout = ({ heroData }) => {
  const herosection = heroData?.sections?.find(
    (section) => section._type === "aboutHero"
  );

  return (
    <div>
      <section className="about-area pt-50 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-8 mx-auto">
              <div className="about-left-side pos-rel mb-30">
                <div className="about-front-img pos-rel">
                  <img src={herosection?.videoThumbnail?.asset?.url} alt="" />
                  <a
                    className="popup-video about-video-btn white-video-btn"
                    href={herosection?.videoUrl}
                  >
                    <i className="fa-solid fa-play"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 ">
              <div className="about-right-side pt-30 mb-30">
                <div className="section-title mb-20">
                  <span>{herosection?.subtitle}</span>
                  <h4>{herosection?.title}</h4>
                </div>
                <div className="about-text mb-50 ">
                  <p>{herosection?.description}</p>
                </div>
                <div className="our-destination">
                  <div className="single-item mb-30 ">
                    <div className="mv-icon f-left">
                      <i className="fa-solid fa-edit"></i>
                    </div>
                    <div className="mv-title fix">
                      <h3>{herosection?.items?.[0].title}</h3>
                      <p>{herosection?.items?.[0].text}</p>
                    </div>
                  </div>
                  <div className="single-item">
                    <div className="mv-icon f-left">
                      <i className="fa-solid fa-gem"></i>
                    </div>
                    <div className="mv-title fix">
                      <h3>{herosection?.items?.[1].title}</h3>
                      <p>{herosection?.items?.[1].text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroAbout;
