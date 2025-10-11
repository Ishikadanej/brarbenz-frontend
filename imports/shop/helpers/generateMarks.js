export const generateMarks = (min, max) => {
  if (min === undefined || max === undefined) return {};
  const mid = Math.floor((min + max) / 2);
  return {
    [min]: `₹${min}`,
    [mid]: `₹${mid}`,
    [max]: `₹${max}`,
  };
};
