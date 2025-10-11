export const updateUrl = (paramsObj) => {
  const params = new URLSearchParams();
  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value);
    }
  });
  const newUrl = `${window.location.pathname}${
    params.toString() ? `?${params.toString()}` : ""
  }`;
  window.history.replaceState({}, "", newUrl);
};
