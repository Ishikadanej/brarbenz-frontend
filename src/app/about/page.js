import React from "react";
import { ABOUTPAGE_QUERY, client } from "../../../lib/sanity";
import AboutUs from "../../../imports/aboutus/page/AboutUs";

const Page = async () => {
  const data = await client.fetch(ABOUTPAGE_QUERY);

  return <AboutUs data={data} />;
};

export default Page;
