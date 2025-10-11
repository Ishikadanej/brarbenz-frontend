export const register = async (data) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      let errorMessage = "Registration failed";
      try {
        const errData = await response.json();
        errorMessage = errData.message || errorMessage;
      } catch {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Something went wrong");
  }
};
