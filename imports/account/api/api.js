import Cookies from "js-cookie";

export const updateProfile = async (data) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/updateprofile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = responseData?.message || "Failed to update profile";
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (err) {
    throw new Error(
      err.message || "Something went wrong while updating profile"
    );
  }
};

export const getOrders = async (token) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/order/getorders`,
    fetchOptions
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.message || "Failed to fetch orders");
  }

  return res;
};
