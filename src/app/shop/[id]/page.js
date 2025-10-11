import React from "react";
import ProductDetail from "../../../../imports/productdetail/page/ProductDetail";

const page = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <ProductDetail productId={id} />
    </div>
  );
};

export const runtime = "edge";
export default page;
