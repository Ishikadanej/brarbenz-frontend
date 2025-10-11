import Cookies from "js-cookie";

export const addToCartApi = async (data) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/cart/add-to-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to add item to cart";
      try {
        const errData = await response.json();
        errorMessage = errData.message || errorMessage;
      } catch {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Something went wrong while adding to cart");
  }
};

export const getCart = async (userId) => {
  try {
    const token = Cookies.get("token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/cart/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to fetch cart";
      try {
        const errData = await response.json();
        errorMessage = errData.message || errorMessage;
      } catch {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    throw new Error(
      err.message || "Something went wrong while fetching the cart"
    );
  }
};

export const removeItemFromCart = async (productId) => {
  try {
    const token = Cookies.get("token");

    // if (!token) {
    //   throw new Error("Authentication token is missing");
    // }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = null;
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) {
      const errorMessage =
        (data && data.message) || "Failed to remove item from cart";
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    throw new Error(
      err.message || "Something went wrong while removing the item"
    );
  }
};
export const getRecentViewsApi = async () => {
  const token = Cookies.get("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/recent-view/get`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch Recent Views");
  }

  return response.json();
};

export const addToWishlist = async (data) => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Authentication token missing. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/wishlist/add-to-wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to add item to wishlist";

      try {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorMessage;
      } catch (jsonError) {
        const fallbackText = await response.text();
        errorMessage = fallbackText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    throw new Error(
      err?.message || "Something went wrong while adding to wishlist"
    );
  }
};

export const getWishlistProducts = async (userId) => {
  try {
    const token = Cookies.get("token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/wishlist/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to fetch cart";
      try {
        const errData = await response.json();
        errorMessage = errData.message || errorMessage;
      } catch {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    throw new Error(
      err.message || "Something went wrong while fetching the cart"
    );
  }
};

export const removeItemFromWishlist = async (productId) => {
  try {
    const token = Cookies.get("token");

    // if (!token) {
    //   throw new Error("Authentication token is missing");
    // }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = null;
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) {
      const errorMessage =
        (data && data.message) || "Failed to remove item from cart";
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    throw new Error(
      err.message || "Something went wrong while removing the item"
    );
  }
};

export const updateCart = async (cartId, updateData) => {
  const token = Cookies.get("token");

  const fetchOptions = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/cart/update-cart/${cartId}`,
    fetchOptions
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.message || "Failed to update cart");
  }

  return res;
};
