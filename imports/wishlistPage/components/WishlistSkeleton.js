import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WishlistSkeleton = () => {
  const rows = Array(4).fill(0);

  return (
    <section className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Desktop Skeleton */}
            <div className="d-none d-md-block">
              <div className="table-content table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Images</th>
                      <th className="cart-product-name">Product</th>
                      <th className="product-price">Unit Price</th>
                      <th className="product-quantity"></th>
                      <th className="product-subtotal">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((_, index) => (
                      <tr key={index}>
                        <td className="product-thumbnail">
                          <Skeleton width={80} height={100} />
                        </td>
                        <td className="product-name">
                          <Skeleton width={80} />
                        </td>
                        <td className="product-price">
                          <Skeleton width={60} />
                        </td>
                        <td className="product-quantity">
                          <Skeleton width={150} height={50} />
                        </td>
                        <td className="product-subtotal">
                          <Skeleton width={20} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Skeleton */}
            <div className="d-md-none">
              {rows.map((_, index) => (
                <div key={index} className="mobile-cart-item mb-4">
                  <div className="row align-items-center">
                    <div
                      className="col-sm-3 pr-0 col-5 
mobile-product-image"
                    >
                      <Skeleton style={{ paddingTop: "125%", width: "100%" }} />
                    </div>

                    <div className="col-sm-9 col-7">
                      <div className="mobile-product-details position-relative">
                        <Skeleton width={120} height={20} className="mb-2" />
                        <Skeleton width={80} height={20} className="mb-2" />
                        <Skeleton width={100} height={20} />
                        <Skeleton width={100} height={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart total skeleton */}
            <div className="row">
              <div className="col-md-5 ml-auto">
                <div className="cart-page-total">
                  <h2>Cart Totals</h2>
                  <ul className="mb-20">
                    <li>
                      Subtotal <Skeleton width={60} />
                    </li>
                  </ul>
                  <button className="bt-btn ">Proceed to checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistSkeleton;
