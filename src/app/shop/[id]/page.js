import React from "react";
import ProductDetail from "../../../../imports/productdetail/page/ProductDetail";

export const runtime = "edge";

const Page = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <ProductDetail productId={id} />
    </div>
  );
};

export default Page;
