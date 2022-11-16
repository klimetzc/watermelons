export const getTagStatus = (status: string | undefined) => {
  switch (status) {
    case 'CREATED':
      return 'default';
    case 'PAYED':
      return 'processing';
    case 'SHIPPED':
      return 'processing';
    case 'COMPLETED':
      return 'success';
    default:
      return 'default';
  }
};
