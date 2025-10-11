"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const Testimonial = ({ testimonials }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
  };

  const testimonialData = testimonials?.sections?.find(
    (section) => section._type === "testimonialSection"
  );

  return (
    <div className="testimonial-area pt-110 ">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="section-title text-center mb-80 ">
              <span>{testimonialData?.subtitle}</span>
              <h1>{testimonialData?.title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        className="testimonial pb-160 "
        style={{ backgroundImage: "url('img/all-bg/test.png')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 offset-lg-2 offset-xl-2">
              <Slider {...sliderSettings} className="testimonial-active">
                {testimonialData?.testimonials?.map((item, index) => (
                  <div
                    className={`testimonial-wrapper text-center`}
                    key={index}
                  >
                    <div className="testimonial-img">
                      <img src={item?.photo?.asset?.url} alt={item.name} />
                      <i className="fa-solid fa-quote-left quote-icon"></i>
                    </div>
                    <div className="testimonial-text">
                      <h3>{item.name}</h3>
                      <span>{item.position}</span>
                      <p>{item.quote}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
