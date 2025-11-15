"use client";
import { useRouter } from "next/navigation";
import useCartStore from "../../../../Zustand/cartStore";
import { useAddToCart } from "../../../../hooks/useAddToCart";
import { useCart } from "../../../../hooks/useCart";
import { useAddToWishlist } from "../../../../hooks/useAddToWishlist";
import { useWishlist } from "../../../../hooks/useWishlist";
import { useRemoveFromWishlist } from "../../../../hooks/useRemoveWishlist";
import Cookies from "js-cookie";
import { useAuth } from "../../../../hooks/useAuth";
import { Heart, ShoppingCart } from "lucide-react";
import { useIsMobile } from "../../../../hooks/useIsMobile";

const ProductCard = ({ product, shop = false }) => {
  const router = useRouter();
  const token = Cookies.get("token");
  const { user } = useAuth();
  const isMobile = useIsMobile()

  const { addToCartMutation } = useAddToCart();
  const { addToWishlistMutation } = useAddToWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const { openCart, wishlist, addToCart } = useCartStore();
  const { refetch } = useCart();
  const { refetch: wishlistRefetch } = useWishlist();

  const handleAddToCart = async () => {
    if (!token || !user) {
      const selectedSize =
        product.sizes?.length > 0 ? product.sizes[0].title : "m";
      addToCart({
        ...product,
        size: selectedSize,
        quantity: 1,
      });
      openCart();
      return;
    }

    const firstImageUrl =
      product.images?.length > 0 ? product.images[0].asset.url : null;

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

  const handleToggleWishlist = () => {
    const firstImageUrl =
      product.images?.length > 0 ? product.images[0].asset.url : null;

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

    if (isInWishlist) {
      removeFromWishlist(product.id, {
        onSuccess: () => {
          wishlistRefetch();
        },
      });
    } else {
      addToWishlistMutation(productPayload, {
        onSuccess: () => {
          wishlistRefetch();
        },
      });
    }
  };

  const isInWishlist = wishlist?.some((item) => item.product.id === product.id);

  return (
    <div className={`${shop ? "col-lg-4 col-sm-6 col-6 " : ""}`}>
      <div className="product-wrapper mb-md-40 mb-20">
        <div className="pro-img mb-20">
          <div
            onClick={() => router.push(`/shop/${product.id}`)}
            style={{
              cursor: "pointer",
              backgroundImage: `url(${product?.images?.[0]?.asset?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              paddingTop: "120%",
              borderRadius: "8px",
            }}
            aria-label={product.title}
          ></div>
          {!isMobile && 
          <div className="product-action text-center">
            <button
              type="button"
              title="Shopping Cart"
              style={{
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
              onClick={handleAddToCart}
            >
              {/* <i className="fa-solid fa-cart-arrow-down"></i> */}
              <ShoppingCart />
            </button>
          </div> 
          }
         
        </div>

        <div className="pro-text">
          <div className="pro-title">
            <h6>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/shop/${product.id}`)}
              >
                {product.title}
              </div>
            </h6>
            <h5 className="pro-price">
              ₹{product.price}
              {product.originalPrice && <del>₹{product.originalPrice}</del>}
            </h5>
          </div>
          {token && (
            <div className="cart-icon">
              <button
                onClick={handleToggleWishlist}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                aria-label={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  size={20}
                  className=" cursor-pointer"
                  fill={isInWishlist ? "red" : "none"}
                  stroke={isInWishlist ? "red" : "gray"}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
