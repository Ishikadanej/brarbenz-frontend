"use client";
import { PortableText } from "@portabletext/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useProductsStore from "../../../Zustand/productStore";
import { ChevronDown } from "lucide-react";

const ProductDes = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { products } = useProductsStore();

  const [openDetails, setOpenDetails] = useState(false);
  const [openCare, setOpenCare] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  useEffect(() => {
    if (products.length > 0 && id) {
      const selectedProduct = products.find((p) => p.id === id || p._id === id);
      setProduct(selectedProduct || null);
    }
  }, [products, id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    );
  }

  const components = {
    types: {
      image: ({ value }) => (
        <div className="my-4">
          <img
            src={value.asset?.url}
            alt={value.alt || "Product Image"}
            className="w-full h-auto"
          />
        </div>
      ),
    },
  };
  
const Accordion = ({ title, isOpen, onToggle, children }) => (
  <div className="w-full">
    {/* Line */}
    <div className="border-t border-gray-300 w-full" />

    {/* Header */}
    <button
      onClick={onToggle}
      className="
        w-full
        flex
        items-center
        justify-between
        bg-transparent
        appearance-none
        text-left
        text-gray-900
        text-base
        py-4
        px-0
      "
      style={{
        border: "none",
        outline: "none",
      }}
    >
      <span className="font-medium tracking-wide uppercase">
        {title}
      </span>

      <ChevronDown
        size={20}
        className={`text-gray-700 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    {/* Content */}
    {isOpen && (
      <div className="pb-4 text-gray-700 text-sm md:text-base">
        {children}
      </div>
    )}
  </div>
);

  return (
    <section className="py-4">
      <div className="max-w-4xl mx-auto px-4">
        <Accordion
          title="Description"
          isOpen={openDetails}
          onToggle={() => setOpenDetails(!openDetails)}
        >
          {product.details ? (
            <PortableText value={product.details} components={components} />
          ) : (
            <p className="text-gray-500">No description available</p>
          )}
        </Accordion>

        <Accordion
          title="Care and Maintenance"
          isOpen={openCare}
          onToggle={() => setOpenCare(!openCare)}
        >
          {product.careandmaintainance ? (
            <p className="whitespace-pre-line">{product.careandmaintainance}</p>
          ) : (
            <p className="text-gray-500">No care instructions available</p>
          )}
        </Accordion>

        <Accordion
          title="Shipping"
          isOpen={openShipping}
          onToggle={() => setOpenShipping(!openShipping)}
        >
          <p className="text-gray-600">
            Standard shipping: 3–7 business days.
          </p>
        </Accordion>

        <div className="border-t border-gray-300"></div>
      </div>
    </section>
  );
};

export default ProductDes;
