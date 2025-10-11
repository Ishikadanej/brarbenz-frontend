import React, { Suspense } from "react";
import Checkout from "../../../imports/checkout/ui/page/Checkout";

const page = () => {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
};

export default page;
