"use client";

import { useEffect } from "react";

export default function InitPlugins() {
  useEffect(() => {
    // Recheck if jQuery is available
    if (typeof window !== "undefined" && window.$) {
      // Slick Slider Init
      $(".slider-active").slick({
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      });

      // WOW Animation
      new WOW().init();

      // ScrollUp
      $.scrollUp();

      // MeanMenu (if using)
      $("#mobile-menu").meanmenu();

      // NiceSelect
      $("select").niceSelect();

      // YTPlayer
      $(".player").YTPlayer();
    }
  }, []);

  return null;
}
