import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "3yqgdekn",
  dataset: "bearbenz",
  apiVersion: "2025-01-01",
  useCdn: false,
});

// for fetching home page sections data
export const HOMEPAGE_QUERY = `*[_type == "homePage"][0]{
  title,
  slug,
  sections[] {
    ...,

    _type == "heroBanner" => {
      _type,
      sectionTitle,
      slides[] {
        title,
        subtitle,
        description,
        ctaText,
        ctaLink,
        discount,
        label,
        backgroundColor,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    },

    _type == "promoBanner" => {
      _type,
      sectionTitle,
      banners[] {
        title,
        subtitle,
        buttonText,
        buttonLink,
        backgroundColor,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    },

    _type == "promoProductSection" => {
      _type,
      sectionTitle,
      products[] {
        title,
        subtitle,
        buttonText,
        buttonLink,
        backgroundColor,
        price,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    },

    _type == "dealOfTheDayBanner" => {
      _type,
      title,
      description,
      discount,
      label,
      ctaText,
      ctaLink,
      countdownEndDate,
      image {
        asset-> {
          _id,
          url
        }
      }
    },

    _type == "promoSection" => {
      _type,
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      features[] {
        text,
        icon {
          asset-> {
            _id,
            url
          }
        }
      },
      image {
        asset-> {
          _id,
          url
        }
      }
    },

    _type == "sellingBanner" => {
      _type,
      title,
      subtitle,
      price,
      originalPrice,
      buttonText,
      buttonLink,
      image {
        asset-> {
          _id,
          url
        }
      }
    }
  }
}`;

// for filter products by category
export const FILTER_CATEGORY_QUERY = `
*[_type == "product"].products[
  select(
    defined(category->title) => lower(category->title),
    defined(category) => lower(category),
    ""
  ) == lower($categoryTitle)
]{
  id,
  title,
  description,
  price,
  "size": size,
  sizes[]{ title },
  "category": select(
    defined(category->title) => category->title,
    defined(category) => category,
    null
  ),
  slug,
  sku,
  images[]{ asset->{ _id, url } }
}
`;



export const OFFERS_QUERY = `
*[_type == "offers" && active == true] 
| order(priority asc) {
  _id,
  message,
  link,
  active,
  startDate,
  endDate,
  priority
}
`;

// fot filtering products by price
export const FILTER_PRICE_QUERY = `
*[_type == "product"].products[
  price >= $minPrice && price <= $maxPrice
]{
  id,
  title,
  description,
  price,
  "size": size,
  sizes[]{ title },
  "category": select(
    defined(category->title) => category->title,
    defined(category) => category,
    null
  ),
  slug,
  sku,
  images[]{ asset->{ _id, url } }
}
`;

// for fetching size data
export const FILTER_BY_SIZE_QUERY = `
*[_type == "product"].products[
  $sizeTitle == null ||
  count(sizes[defined(title) && lower(title) == lower($sizeTitle)]) > 0
]{
  id,
  title,
  description,
  price,
  sizes[]{ title },
  images[]{ asset->{ _id, url } },
  category->{ _id, title }
  
}
`;

// for fetching products
export const PRODUCTS_QUERY = `*[_type == "product"]{
  _type,
  sectionTitle,
  products[] {
    id,
    title,
    slug,
    description,
    careandmaintainance,
    details[]{
      ...,
      children[]{
        ...,
        _type == "span" => {
          text
        }
      },
      _type == "image" => {
        ...,
        asset->{
          _id,
          url
        },
        alt
      }
    },
    price,
    originalPrice,
    inStock,
    sku,
    images[] {
      asset->{
        _id,
        url
      }
    },
    colors,
    sizes[] {
      title,
      images[] {
        asset->{
          _id,
          url
        }
      }
    },
    category->{
      _id,
      title
    },
    isTrending,
    isFeatured,
    isNewArrival,
    rating,
    tags
  }
}`;

// for fetching categories
export const CATEGORIES_QUERY = `*[_type == "category"]{
  _id,
  _type,
  title,
  slug,
  description,
  image {
    asset->{
      _id,
      url
    }
  },
  isHome
}`;

// for fetching products by its category
export const HOME_CATS_WITH_PRODUCTS = `
*[_type == "category" && isHome == true] | order(title asc) {
  _id,
  title,
  "products": *[_type == "product"].products[category._ref == ^._id]{
    id,
    title,
    price,
    originalPrice,
    inStock,
    sku,
    isTrending,
    isFeatured,
    isNewArrival,
    rating,
    tags,
    "category": category->{
      _id,
      title
    },
    images[]{
      asset->{
        _id,
        url
      }
    },
    sizes[]{
      title,
      images[]{
        asset->{
          _id,
          url
        }
      }
    },
    colors
  }
}
`;

// fetching all category with its products for filter
export const ALL_HOME_CATEGORIES_WITH_PRODUCTS = `
*[_type == "category"] | order(title asc) {
  _id,
  title,
    "products": *[_type == "product"].products[category._ref == ^._id]{
    id,
    title,
    price,
    originalPrice,
    inStock,
    sku,
    isTrending,
    isFeatured,
    isNewArrival,
    rating,
    tags,
    "category": category->{
      _id,
      title
    },
    images[] {
      asset-> {
        _id,
        url
      }
    },
    sizes[] {
      title,
      images[] {
        asset-> {
          _id,
          url
        }
      }
    },
    colors
  }
}
`;

// for fetching about section data
export const ABOUTPAGE_QUERY = `*[_type == "aboutPage"][0]{
  title,
  slug,
  sections[] {
    ...,
    _type == "aboutHero" => {
      _type,
      videoFile {
        asset-> {
          _id,
          url
        }
      },
      videoUrl,
      videoThumbnail {
        asset-> {
          _id,
          url
        }
      },
      subtitle,
      title,
      description,
      items[] {
        icon {
          asset-> {
            _id,
            url
          }
        },
        title,
        text
      }
    },

    _type == "featureSection" => {
      _type,
      subtitle,
      title,
      features[] {
        icon {
          asset-> {
            _id,
            url
          }
        },
        title,
        description
      }
    },

    _type == "teamSection" => {
      _type,
      subtitle,
      title,
      members[] {
        photo {
          asset-> {
            _id,
            url
          }
        },
        name,
        role,
        facebook,
        linkedin,
        instagram
      }
    },

    _type == "getConsultant" => {
      _type,
      subtitle,
      title,
      buttonText,
      buttonLink,
      backgroundImage {
        asset-> {
          _id,
          url
        }
      }
    },

    _type == "testimonialSection" => {
      _type,
      subtitle,
      title,
      testimonials[] {
        photo {
          asset-> {
            _id,
            url
          }
        },
        name,
        role,
        company,
        quote
      }
    }
  }
}`;

export const PRODUCTS_BY_IDS_QUERY = `*[_type == "product" && id in $productIds]{
  _type,
  sectionTitle,
  products[] {
    id,
    title,
    slug,
    description,
    details[] {
      ...,
      children[] {
        ...,
        _type == "span" => {
          text
        }
      },
      _type == "image" => {
        ...,
        asset->{
          _id,
          url
        },
        alt
      }
    },
    price,
    originalPrice,
    inStock,
    sku,
    images[] {
      asset->{
        _id,
        url
      }
    },
    colors,
    sizes[] {
      title,
      images[] {
        asset->{
          _id,
          url
        }
      }
    },
    category->{
      _id,
      title
    },
    isTrending,
    isFeatured,
    isNewArrival,
    rating,
    tags
  }
}`;
