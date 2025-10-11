"use client";

import React from "react";
import HeroAbout from "../components/HeroAbout";
import FeturesArea from "../components/FeturesArea";
import TeamMember from "../components/TeamMember";
import GetConsultant from "../components/GetConsultant";
import Testimonial from "../components/Testimonial";

const AboutUs = ({ data }) => {
  return (
    <div>
      <HeroAbout heroData={data} />
      <FeturesArea data={data} />
      <TeamMember teamData={data} />
      <GetConsultant details={data} />
      <Testimonial testimonials={data} />
    </div>
  );
};

export default AboutUs;
