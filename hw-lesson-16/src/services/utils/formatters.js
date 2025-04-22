
export const formatPrice = (price, decimals = 2) => {
  return Number(price).toFixed(decimals);
};

export const formatCurrency = (price, locale = undefined, currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(price);
};