import Cookies from "js-cookie";

export const createOrder = async (orderData, token) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/order/create-order`,
    fetchOptions
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message || "Failed to create order");
  }
  return response.json();
};

export const saveBillingDetails = async (data) => {
  const token = Cookies.get("token");
  const fetchOptions = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/updateprofile`,
    fetchOptions
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.message || "Failed to update profile");
  }

  return res;
};

export const updateUserAddress = async (selectedAddressId, data) => {
  const token = Cookies.get("token");
  const fetchOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/updateAddress/${selectedAddressId}`,
    fetchOptions
  );
  if (response.status !== 200) {
    const text = await response.json();
    throw new Error(text.message);
  }

  return response.json();
};

export const getCoupon = async () => {
  const fetchOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/coupon/get-all-coupons`,
    fetchOptions
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.message || "Failed to fetch orders");
  }

  return res;
};
