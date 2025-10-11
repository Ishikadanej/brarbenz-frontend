import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import useProductsStore from "../../../Zustand/productStore";
import { client, FILTER_CATEGORY_QUERY } from "../../../lib/sanity";

const Categories = ({ categories }) => {
  const { setFilterProducts, selectedCat, setSelectedCat, setPage } =
    useProductsStore();

  if (!categories) return null;
  const router = useRouter();

  const categoryClick = async (title) => {
    try {
      setSelectedCat(title);
      setPage(1);

      const filteredProducts = await client.fetch(FILTER_CATEGORY_QUERY, {
        categoryTitle: title,
      });

      setFilterProducts(filteredProducts);

      router.push(`/shop?category=${encodeURIComponent(title)}&page=1`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="categories-slider pt-80  pb-70 ">
      <div className="container">
        <div
          className="d-flex  justify-content-sm-center  justify-content-center justify-content-md-start  flex-wrap "
          style={{ gap: "50px" }}
        >
          {categories.map((item, index) => (
            <div
              className="single-categories text-center"
              key={index}
              style={{
                display: "inline-block",
                minWidth: "120px",
              }}
              onClick={() => {
                categoryClick(item.title);
              }}
            >
              <div
                className="icon"
                style={{
                  backgroundImage: `url(${item?.image?.asset?.url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  cursor: "pointer",
                }}
              ></div>
              <h6>
                <span style={{ cursor: "pointer" }}>{item.title}</span>
              </h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
