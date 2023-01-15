interface IUtmMarks {
  [key: string]: string;
}

export const getUtmMarks = () => {
  const searchString = window.location.search;
  return searchString
    .split('?')
    .filter((v) => v.startsWith('utm'))
    .reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    }, <IUtmMarks>{});
};
