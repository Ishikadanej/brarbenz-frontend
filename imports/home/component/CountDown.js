"use client";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const CountDown = ({ data }) => {
  const router = useRouter();

  const handleClick = (item) => {
    router.push(item.buttonLink || "/");
  };

  const banner = data?.sections?.find(
    (section) => section._type === "dealOfTheDayBanner"
  );

  if (!banner) return null;

  const countdownDate = banner.countdownEndDate;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <CountdownWrapper>
          <TimeBox>
            <strong>00</strong>
            <span>days</span>
          </TimeBox>
          <TimeBox>
            <strong>00</strong>
            <span>hour</span>
          </TimeBox>
          <TimeBox>
            <strong>00</strong>
            <span>minute</span>
          </TimeBox>
          <TimeBox>
            <strong>00</strong>
            <span>second</span>
          </TimeBox>
        </CountdownWrapper>
      );
    } else {
      return (
        <CountdownWrapper>
          <TimeBox>
            <strong>{String(days).padStart(2, "0")}</strong>
            <span>days</span>
          </TimeBox>
          <TimeBox>
            <strong>{String(hours).padStart(2, "0")}</strong>
            <span>hour</span>
          </TimeBox>
          <TimeBox>
            <strong>{String(minutes).padStart(2, "0")}</strong>
            <span>minute</span>
          </TimeBox>
          <TimeBox>
            <strong>{String(seconds).padStart(2, "0")}</strong>
            <span>second</span>
          </TimeBox>
        </CountdownWrapper>
      );
    }
  };

  return (
    <div
      className="countdown-area pt-125 pb-120"
      style={{
        backgroundImage: `url(${banner.image?.asset?.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-4 offset-xl-8 col-lg-5 offset-lg-7 col-md-8 offset-md-4 custom-width-40">
            <div className="countdown-wrapper hero-caption-four">
              <div className="sli-offer mb-15">
                {banner.discount && <span>{banner.discount}</span>}
                {banner.label && <span>{banner.label}</span>}
              </div>

              <h2>{banner.title}</h2>
              <p>{banner.description}</p>

              <div className="product-countdown mb-40">
                <div className="time-count-deal">
                  <Countdown date={countdownDate} renderer={renderer} />
                </div>
              </div>
              <button
                onClick={() => handleClick(banner)}
                className="common-link"
              >
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

export default CountDown;

const CountdownWrapper = styled.div`
  display: flex;
`;

const TimeBox = styled.div`
  height: 80px;
  width: 70px;
  display: inline-block;
  text-align: center;
  background: #fff;
  margin-right: 12px;
  border-radius: 15px;
  font-size: 26px;
  font-weight: 400;
  color: #111;
  line-height: 1;
  padding-top: 20px;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.12);
  strong {
    display: block;
  }
  span {
    font-size: 0.75rem;
    color: #666;
  }
`;
