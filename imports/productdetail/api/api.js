import Cookies from "js-cookie";

export const addToRecentViewtApi = async (product) => {
  const token = Cookies.get("token");
  const fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: product.id,
    }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/recent-view/add`,
    fetchOptions
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to add to Recent Views");
  }

  return response.json();
};


