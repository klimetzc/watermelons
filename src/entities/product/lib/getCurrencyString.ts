export const getCurrencyString = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'RUB':
      return '₽';
    case 'CNY':
      return '¥';
    case 'EUR':
      return '€';
    default:
      return '$';
  }
};
