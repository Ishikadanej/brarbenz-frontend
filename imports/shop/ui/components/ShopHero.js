"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "rc-slider/assets/index.css";
import useProductsStore from "../../../../Zustand/productStore";
import { client, PRODUCTS_QUERY } from "../../../../lib/sanity";
import { useRouter } from "next/navigation";
import Pagination from "../../../pagination/Pagination";
import useCartStore from "../../../../Zustand/cartStore";
import { useRecentView } from "../../../../hooks/useRecentView";
import { useAuth } from "../../../../hooks/useAuth";
import { useAddToCart } from "../../../../hooks/useAddToCart";
import { useCart } from "../../../../hooks/useCart";
import { useProducts } from "../../../../hooks/useProduct";
import { useCategories } from "../../../../hooks/useCategories";
import { useSizes } from "../../../../hooks/useSize";
import { usePrice } from "../../../../hooks/usePrice";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { FiltersPanel } from "./FilterPanel";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import MobileFilterBar from "./MobileFilterBar";
import { updateUrl } from "../../helpers/updateUrl";
import FiltersPanelSkeleton from "./FiltersSkeleton";
import { LayoutGrid, LayoutList, ShoppingCart } from "lucide-react";

const ShopHero = () => {
  const [categories, setCategories] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const {
    products,
    setProducts,
    filterProducts,
    setFilterProducts,
    selectedCat,
    setSelectedCat,
    page,
    setPage,
    recentViews,
    setRecentViews,
  } = useProductsStore();
  const router = useRouter();
  const perPage = 6;
  const { user, token } = useAuth();
  const { openCart, addToCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setfilter] = useState(true);
  const [mobileFilter, setMobileFilter] = useState(false);
  const { addToCartMutation } = useAddToCart();
  const { refetch } = useCart();
  const { data: productData, isLoading } = useProducts();
  const { categories: categoryData } = useCategories();
  const { sizes } = useSizes(selectedSize);
  const { priceData } = usePrice(minPrice, maxPrice);
  const isMobile = useIsMobile();
  const [pendingRange, setPendingRange] = useState([0, 0]);

  useEffect(() => {
    if (productData?.[0]?.products?.length) {
      const products = productData[0].products;
      setProducts(products);

      const prices = products.map((p) => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setPriceRange([min, max]);
      setPendingRange([min, max]);

      setMinPrice(min);
      setMaxPrice(max);
    }
  }, [productData, setProducts]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkScreen = () => {
        setfilter(window.innerWidth >= 768);
        setMobileFilter(window.innerWidth <= 768);
      };
      checkScreen();
      window.addEventListener("resize", checkScreen);
      return () => window.removeEventListener("resize", checkScreen);
    }
  }, []);

  const { data } = useRecentView();

  const getPageData = (currentPage, perPage, totalProducts) => {
    if (totalProducts === 0) return "Showing 0 results";
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalProducts);
    return `Showing ${start}–${end} of ${totalProducts} results`;
  };

  useEffect(() => {
    if (data) {
      setRecentViews(data);
    }
    if (!user?.id || !token) {
      setRecentViews([]);
    }
  }, [data, setRecentViews, token, user?.id]);

  const getPageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page") || "1", 10);
    return page && page > 0 ? page : 1;
  };

  useEffect(() => {
    setPage(getPageFromUrl());
  }, [setPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    if (selectedCat) {
      updateUrl({ category: selectedCat, page: newPage });
    } else if (selectedSize) {
      updateUrl({ size: selectedSize, page: newPage });
    } else if (minPrice || maxPrice) {
      updateUrl({ minPrice, maxPrice, page: newPage });
    } else {
      updateUrl({ page: newPage });
    }
  };

  useEffect(() => {
    setPage(getPageFromUrl());
  }, []);

  const handleAddToCart = async (product) => {
    if (!token || !user) {
      const selectedSize =
        product.sizes?.length > 0 ? product.sizes[0].title : "m";
      addToCart({ ...product, size: selectedSize, quantity: 1 });
      openCart();
      return;
    }

    const firstImageUrl =
      product.images?.length > 0 ? product.images[0].asset?.url : null;

    const selectedSize =
      product.sizes?.length > 0 ? product.sizes[0].title : "m";

    const productPayload = {
      productId: product.id,
      productName: product.title,
      productImage: firstImageUrl,
      size: selectedSize,
      quantity: 1,
      price: product.price,
    };
    addToCartMutation(productPayload, {
      onSuccess: () => {
        refetch();
        openCart();
      },
    });
  };

  useEffect(() => {
    if (categoryData?.length) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const sizesWithCount = products.reduce((acc, product) => {
    (product.sizes || []).forEach((size) => {
      const key = String(size.title).toLowerCase().trim();
      if (!acc[key]) {
        acc[key] = { ...size, count: 0 };
      }
      acc[key].count += 1;
    });
    return acc;
  }, {});

  const fetchSize = async () => {
    if (!products.length) return;
    const uniqueSizes = Object.values(sizesWithCount);
    setAllSizes(uniqueSizes);
  };

  useEffect(() => {
    fetchSize();
  }, [products]);

  useEffect(() => {
    if (
      !selectedCat &&
      !selectedSize &&
      !minPrice &&
      !maxPrice &&
      sizes.length
    ) {
      setFilterProducts(sizes);
    }
  }, [sizes, selectedCat, selectedSize, minPrice, maxPrice]);

  useEffect(() => {
    let filteredProducts = products;

    if (selectedCat) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.category &&
          p.category.title.toLowerCase().trim() ===
            selectedCat.toLowerCase().trim()
      );
    }

    if (selectedSize) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.sizes &&
          p.sizes.some(
            (s) =>
              s.title.toLowerCase().trim() === selectedSize.toLowerCase().trim()
          )
      );
    }

    filteredProducts = filteredProducts.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    setFilterProducts(filteredProducts);
  }, [products, selectedCat, selectedSize, minPrice, maxPrice]);

  const handleChange = (values) => {
    setPendingRange(values);
  };

  useEffect(() => {
    setPendingRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const onHandleChangeComplete = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    setPage(1);
    updateUrl({ minPrice: values[0], maxPrice: values[1], page: 1 });
  };

  const handleClearFilters = async () => {
    setSelectedSize("");
    setSelectedCat(null);
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
    setPendingRange(priceRange);
    setPage(1);
    updateUrl({});

    try {
      const allProducts = await client.fetch(PRODUCTS_QUERY);
      const newproducts = allProducts?.[0].products;
      setFilterProducts(newproducts);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCategoryClick = async (title) => {
    setSelectedCat(title);
    setPage(1);
    updateUrl({ category: title, page: 1 });
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPage(1);
    updateUrl({ size, page: 1 });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sizeFromUrl = params.get("size");
    const categoryFromUrl = params.get("category");
    const maxPriceFromUrl = params.get("maxPrice");
    const minPriceFromUrl = params.get("minPrice");
    const pageFromUrl = params.get("page");

    const init = async () => {
      let filteredProducts = products;
      if (categoryFromUrl && products.length > 0) {
        setSelectedCat(categoryFromUrl);

        filteredProducts = filteredProducts.filter(
          (p) =>
            p.category &&
            p.category.title.toLowerCase().trim() ===
              categoryFromUrl.toLowerCase().trim()
        );
      }

      if (sizeFromUrl && products.length > 0) {
        setSelectedSize(sizeFromUrl);

        filteredProducts = filteredProducts.filter(
          (p) =>
            p.sizes &&
            p.sizes.some(
              (s) =>
                s.title.toLowerCase().trim() ===
                sizeFromUrl.toLowerCase().trim()
            )
        );
      }

      if ((minPriceFromUrl || maxPriceFromUrl) && products.length > 0) {
        const min = Number(minPriceFromUrl) || priceRange[0];
        const max = Number(maxPriceFromUrl) || priceRange[1];

        setPendingRange([min, max]);
        setMinPrice(min);
        setMaxPrice(max);

        filteredProducts = filteredProducts.filter(
          (p) => p.price >= min && p.price <= max
        );
      }

      setFilterProducts(filteredProducts);

      if (pageFromUrl) {
        setPage(parseInt(pageFromUrl, 10));
      }
    };

    init();
  }, [products, priceRange]);

  return (
    <section className="shop-sidebar pt-75 " style={{ position: "relative" }}>
      <div className="container">
        <div className="row w-full">
          <div className="col-lg-3 col-md-4 ">
            {isLoading && !isMobile ? (
              <div className="d-md-block d-none">
                <FiltersPanelSkeleton />
              </div>
            ) : (
              <div>
                {filter && (
                  <FiltersPanel
                    categories={categories}
                    handleCategoryClick={(title) => {
                      handleCategoryClick(title);
                    }}
                    allSizes={allSizes}
                    selectedSize={selectedSize}
                    setSelectedSize={handleSizeSelect}
                    minPrice={pendingRange[0]}
                    maxPrice={pendingRange[1]}
                    handleChange={handleChange}
                    onHandleChangeComplete={onHandleChangeComplete}
                    recentViews={recentViews}
                    router={router}
                    handleClearFilters={handleClearFilters}
                    selectedcategory={selectedCat}
                    setSelectedCategory={setSelectedCat}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    priceRange={priceRange}
                  />
                )}
              </div>
            )}
          </div>

          <div className="col-lg-9 col-md-8">
            <div className="shop-content-area">
              <div className="content-header mb-55">
                <div className="ch-left">
                  <ul className="nav shop-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "home" ? "active" : ""
                        }`}
                        id="home-tab"
                        role="tab"
                        aria-controls="home"
                        aria-selected={activeTab === "home"}
                        onClick={() => setActiveTab("home")}
                      >
                        <LayoutGrid style={{ cursor: "pointer" }} />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "profile" ? "active" : ""
                        }`}
                        id="profile-tab"
                        role="tab"
                        aria-controls="profile"
                        aria-selected={activeTab === "profile"}
                        onClick={() => setActiveTab("profile")}
                      >
                        <LayoutList style={{ cursor: "pointer" }} />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="show-text">
                  <span>
                    {getPageData(page, perPage, filterProducts.length)}
                  </span>
                </div>
              </div>

              <div className="tab-content shop-tabs-content" id="myTabContent">
                {/* Grid view */}
                <div
                  className={`tab-pane fade ${
                    activeTab === "home" ? "show active" : ""
                  }`}
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  {isLoading ? (
                    <div className="row">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <ProductCardSkeleton key={i} shop />
                      ))}
                    </div>
                  ) : filterProducts.length === 0 ? (
                    <p className="text-center">No products found</p>
                  ) : (
                    <div className="row">
                      {filterProducts
                        .slice((page - 1) * perPage, page * perPage)
                        .map((product, index) => (
                          <ProductCard key={index} product={product} shop />
                        ))}
                    </div>
                  )}
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "profile" ? "show active" : ""
                  }`}
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  {filterProducts
                    .slice((page - 1) * perPage, page * perPage)
                    .map((product, index) => (
                      <div className="row mb-20" key={product.id || index}>
                        <div className="col-md-4 col-5 custom-col-10 product-list-img">
                          <div className="product-wrapper mb-30">
                            <div className="pro-img mb-20">
                              <a href={`/shop/${product.id}`}>
                                <img
                                  src={product?.images?.[0]?.asset?.url}
                                  className="img-fluid"
                                  alt={product.title || "Product"}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8 col-7  custom-col-10  product-list">
                          <div className="product-wrapper pro-list-content mb-40">
                            <div className="pro-text">
                              <div className="pro-title">
                                <h6>
                                  <a href={`/shop/${product.id}`}>
                                    {product.title}
                                  </a>
                                </h6>
                                <h5 className="pro-price"> ₹{product.price}</h5>
                              </div>
                              <p>{product.description}</p>
                              <div className="product-action">
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Shopping Cart"
                                  style={{
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                  }}
                                >
                                  <ShoppingCart size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {filterProducts.length > 0 && (
                <Pagination
                  total={filterProducts.length}
                  perPage={perPage}
                  page={page}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>

        <div className={`filter-backdrop ${isOpen ? "show" : ""}`} />
        <aside
          className={`filter-sheet ${isOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <div className="filter-sheet__handle" />
          <div className="filter-sheet__header">
            <h5>Filters</h5>
            <button
              className="filter-sheet__close"
              aria-label="Close filters"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="filter-sheet__body ">
            <FiltersPanel
              categories={categories}
              hand
              handleCategoryClick={(title) => {
                handleCategoryClick(title);
              }}
              allSizes={allSizes}
              selectedSize={selectedSize}
              setSelectedSize={handleSizeSelect}
              minPrice={pendingRange[0]}
              maxPrice={pendingRange[1]}
              handleChange={handleChange}
              onHandleChangeComplete={onHandleChangeComplete}
              recentViews={recentViews}
              router={router}
              handleClearFilters={handleClearFilters}
              selectedcategory={selectedCat}
              setSelectedCategory={setSelectedCat}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              priceRange={priceRange}
            />
          </div>
          <div className="filter-sheet__footer">
            <button
              className="bt-btn"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Apply
            </button>
          </div>
        </aside>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "90%",
          zIndex: 1000,
        }}
      >
        <MobileFilterBar
          isOpen={isOpen}
          isMobile={isMobile}
          onToggle={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </section>
  );
};

export default ShopHero;
