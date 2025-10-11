import React from "react";
import Homenew from "../../imports/home/page/Homenew";
import {
  CATEGORIES_QUERY,
  client,
  HOME_CATS_WITH_PRODUCTS,
  HOMEPAGE_QUERY,
  PRODUCTS_QUERY,
} from "../../lib/sanity";

const Page = async () => {
  const homepageData = await client.fetch(HOMEPAGE_QUERY);
  console.log("")
  const productData = await client.fetch(PRODUCTS_QUERY);
  const categoriesWithProducts = await client.fetch(HOME_CATS_WITH_PRODUCTS);
  const categories = await client.fetch(CATEGORIES_QUERY);

  return (
    <Homenew
      data={homepageData}
      productData={productData}
      categoriesWithProducts={categoriesWithProducts}
      categories={categories}
    />
  );
};

export default Page;
