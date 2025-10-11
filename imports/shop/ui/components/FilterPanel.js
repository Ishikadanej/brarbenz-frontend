import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export const FiltersPanel = ({
  categories,
  handleCategoryClick,
  allSizes,
  selectedSize,
  setSelectedSize,
  minPrice,
  maxPrice,
  handleChange,
  recentViews,
  router,
  onHandleChangeComplete,
  handleClearFilters,
  selectedcategory,
  setMinPrice,
  setMaxPrice,
  setSelectedCategory,
  priceRange,
}) => {
  const clearOtherFilters = (filterType) => {
    if (filterType === "category") {
      setSelectedSize(null);
      setMinPrice(priceRange?.[0]);
      setMaxPrice(priceRange?.[1]);
    }
    if (filterType === "size") {
      setSelectedCategory(null);
      setMinPrice(priceRange?.[0]);
      setMaxPrice(priceRange?.[1]);
    }
    if (filterType === "price") {
      setSelectedCategory(null);
      setSelectedSize(null);
    }
  };

  return (
    <>
      <div className="side-cat mb-45">
        <div className="d-flex gap-4 justify-content-md-between align-items-md-start justify-content-end">
          <h6 className="cat-title pb-20 filter-title">Filters</h6>

          {(selectedcategory ||
            selectedSize ||
            minPrice > priceRange?.[0] ||
            maxPrice < priceRange?.[1]) && (
            <button
              className="fw-bold text-decoration-underline bg-transparent border-0"
              style={{ color: "#3e976c" }}
              onClick={handleClearFilters}
            >
              Clear All
            </button>
          )}
        </div>

        <h6 className="cat-title pb-20">Categories</h6>
        <ul>
          {categories.length ? (
            categories.map((cat, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    clearOtherFilters("category");
                    handleCategoryClick(cat.title);
                  }}
                  className={`rounded cursor-pointer ${
                    selectedcategory === cat.title
                      ? "selected-cat"
                      : "text-gray-700"
                  }`}
                >
                  {cat.title} ({cat.count})
                </a>
              </li>
            ))
          ) : (
            <li>No categories found</li>
          )}
        </ul>
      </div>

      <div className="slider-range mb-40">
        <div className="cat-title mb-30">
          <h6>Filter By Price</h6>
        </div>

        <div className="slider-container mb-2">
          <RangeSlider
            id="range-slider"
            min={priceRange?.[0] || 0}
            max={priceRange?.[1] || 0}
            value={[minPrice, maxPrice]}
            step={1}
            onInput={(val) => {
              clearOtherFilters("price");
              handleChange(val);
            }}
            onThumbDragEnd={() => {
              onHandleChangeComplete([minPrice, maxPrice]);
            }}
            onRangeDragEnd={() => {
              onHandleChangeComplete([minPrice, maxPrice]);
            }}
          />
        </div>

        <div className="price-display flex justify-between">
          <label name="amount">Price : </label>{" "}
          <span className="price">₹{minPrice}</span>
          <span className="price"> - </span>
          <span className="price">₹{maxPrice}</span>
        </div>
      </div>

      <div className="side-tag mb-50">
        <h6 className="cat-title pb-20">Size</h6>
        <ul>
          {allSizes.length ? (
            allSizes.map((size, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    clearOtherFilters("size");
                    setSelectedSize(size.title);
                  }}
                  className={`rounded cursor-pointer ${
                    selectedSize === size.title
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {size.title} <span>({size.count})</span>
                </a>
              </li>
            ))
          ) : (
            <li>No sizes Available</li>
          )}
        </ul>
      </div>

      {/* Recent views */}
      {!!recentViews.length && (
        <div className="side-product mb-50">
          <h6 className="cat-title pb-20">Recent Product</h6>
          {recentViews.map((product, index) => (
            <div className="side-pro-wrapper mb-20" key={index}>
              <div className="side-pro-img">
                <span
                  onClick={() => router.push(`/shop/${product.resolvedId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={product.imageUrl || "img/product/default.jpg"}
                    className="img-fluid1 w-80 h-80 object-cover"
                    alt={product.title}
                  />
                </span>
              </div>
              <div className="side-pro-text">
                <h6>
                  <span
                    onClick={() => router.push(`/shop/${product.resolvedId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {product.title}
                  </span>
                </h6>
                <span className="price">
                  ₹{product.price}{" "}
                  {product.originalPrice && <del>₹{product.originalPrice}</del>}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
