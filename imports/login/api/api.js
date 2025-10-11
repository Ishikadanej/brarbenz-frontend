export const login = async (data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/login`,
    fetchOptions
  );
  if (response.status !== 200) {
    const text = await response.json();
    throw new Error(text.message);
  }
  return response.json();
};

export const me = async (token) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/me`,
    fetchOptions
  );
  if (response.status !== 200) {
    const res = await response.json();
    throw new Error(res.message);
  }
  return response.json();
};

export const googleLogin = async (token) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/google-login`,
    fetchOptions
  );

  if (response.status !== 200) {
    const text = await response.json();
    throw new Error(text.message);
  }

  return response.json();
};
