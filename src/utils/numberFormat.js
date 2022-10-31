export const formatNumber = (value, digit = 2) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit
  });
};
