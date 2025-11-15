"use client";
import { PortableText } from "@portabletext/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useProductsStore from "../../../Zustand/productStore";

const ProductDes = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { products } = useProductsStore();

  const [openDetails, setOpenDetails] = useState(false);
  const [openCare, setOpenCare] = useState(false);

  useEffect(() => {
    if (products.length > 0 && id) {
      const selectedProduct = products.find((p) => p.id === id || p._id === id);
      setProduct(selectedProduct || null);
    }
  }, [products, id]);

  if (!product) return <p>Loading product...</p>;

  const components = {
    types: {
      image: ({ value }) => (
        <div className="my-4">
          <img
            src={value.asset?.url}
            alt={value.alt || "Product image"}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      ),
    },
  };

  return (
    <section className="pro-desc-area" style={{ color: "#000" }}>
      <div className="container">

        {/* Product Details */}
        <div
          style={{
            borderBottom: "1px solid #ddd",
            padding: "8px 0",

            cursor: "pointer",
          }}
          onClick={() => setOpenDetails((x) => !x)}
        >
          <h4 style={{ margin: 0, fontWeight: "600", color: "#000", fontSize: "16px" }}>

            {openDetails ? "▼" : "▶"} Product Details
          </h4>
        </div>

        {openDetails && (
          <div style={{ padding: "10px 0", color: "#000" }}>
            {product.details && (
              <PortableText value={product.details} components={components} />
            )}
          </div>
        )}

        {/* Care & Maintenance */}
        <div
          style={{
            borderBottom: "1px solid #ddd",
            padding: "8px 0",
            cursor: "pointer",
          }}
          onClick={() => setOpenCare((x) => !x)}
        >
          <h4 style={{ margin: 0, fontWeight: "600", color: "#000", fontSize: "16px" }}>
            {openCare ? "▼" : "▶"} Care & Maintenance
          </h4>
        </div>

        {openCare && (
          <div style={{ padding: "10px 0", color: "#000" }}>
            {product.careandmaintainance && (
              <p>{product.careandmaintainance}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDes;
