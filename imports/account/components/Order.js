"use client";
import React from "react";
import { useOrder } from "../../../hooks/useOrder";

const Order = () => {
  const { data, isLoading } = useOrder();
  if (isLoading) return <p className="text-center mt-4">Loading orders...</p>;
  if (!Array.isArray(data?.orders) || data.orders.length === 0) {
    return <p className="text-center mt-4">No orders found.</p>;
  }

  const groupedOrders = data.orders.reduce((acc, order) => {
    const dateKey = new Date(order.createdAt).toLocaleDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(order);
    return acc;
  }, {});

  return (
    <div className="container py-md-5 py-0 px-md-2 px-0 ">
      <p className="mb-4 fw-bold profile-title">Your Orders</p>

      {Object.entries(groupedOrders).map(([date, orders]) => (
        <div key={date} className="mb-5">
          <div className="mb-3 fw-semibold text-muted">Order Date: {date}</div>

          {orders.map((order) => (
            <div
              key={order.id}
              className="card mb-4 shadow-sm border rounded p-3"
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="fw-bold">Order ID: #{order.id}</div>
                <span
                  className={`px-3 py-1 rounded-pill fw-semibold  ${
                    order?.orderStatus === "pending"
                      ? "bg-warning text-dark"
                      : order?.orderStatus === "placed"
                      ? "bg-primary text-white"
                      : order?.orderStatus === "shipped"
                      ? "bg-info text-white"
                      : order?.orderStatus === "delivered"
                      ? "bg-success text-white"
                      : order?.orderStatus === "cancelled"
                      ? "bg-danger text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {order?.orderStatus}
                </span>
              </div>

              {(Array.isArray(order?.productDetails)
                ? order.productDetails
                : order?.productDetails
                ? [order.productDetails]
                : []
              ).map((product, idx) => (
                <div
                  key={product.id || idx}
                  className="d-flex align-items-start justify-content-between mb-3 p-2 bg-light rounded"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={product?.imageUrl}
                      alt={product?.title || "product"}
                      className="img-thumbnail me-3"
                      style={{
                        width: "80px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <div className="fw-semibold pb-2">{product?.title}</div>
                      <div className="text-muted small pb-1">
                        Size: {product?.size?.toUpperCase()} | Quantity:{" "}
                        {product?.quantity}
                      </div>
                      <div className="text-dark small">
                        Price: ₹{product?.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-end fw-bold mt-3">
                Total Amount: ₹{order.totalAmount}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Order;
