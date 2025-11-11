import React, { Suspense } from "react";
import Shop from "../../../imports/shop/ui/page/Shop";

const page = () => {
  return (
    <div>
      <Suspense>
      <Shop />
      </Suspense>
    </div>
  );
};

export default page;
