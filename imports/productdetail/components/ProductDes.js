"use client";
import { PortableText } from "@portabletext/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useProductsStore from "../../../Zustand/productStore";

const ProductDes = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { products } = useProductsStore();

  useEffect(() => {
    if (products.length > 0 && id) {
      const selectedProduct = products.find((p) => p.id === id || p._id === id);
      setProduct(selectedProduct || null);
    }
  }, [products, id]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  const components = {
    types: {
      image: ({ value }) => {
        return (
          <div className="my-4">
            <img
              src={value.asset?.url}
              alt={value.alt || "Product image"}
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        );
      },
    },
  };

  return (
    <section className="pro-desc-area">
      <div className="container">
        {product.details && (
          <PortableText value={product.details} components={components} />
        )}
      </div>
    </section>
  );
};

export default ProductDes;
