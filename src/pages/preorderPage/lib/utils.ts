export const getHumanReadableStatus = (status: string | undefined) => {
  switch (status) {
    case 'CLIENT_AWAITING_PAYMENT':
      return 'Ожидает оплаты';

    case 'SELLER':
      return 'SELLER';

    default:
      return 'Статус отсутствует';
  }
};
