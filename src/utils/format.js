export const formatCurrency = (value) => {
  if (isNaN(value)) return "";
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  }).format(value);
};
export const parseCurrency = (value) => {
  // Remove commas and convert to number
  const numericValue = value.replace(/,/g, ""); // Remove commas
  return Number(numericValue); // Convert to number
};
