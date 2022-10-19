import { IProduct } from '../../shared/api/types/interfaces';

const useSort = (products: IProduct[], sort: string) => {
  if (sort === '' || null) return [...products];
  if (sort === 'cheap') return [...products].sort((a, b) => a.price - b.price);
  if (sort === 'expensive')
    return [...products].sort((a, b) => b.price - a.price);
  if (sort === 'low-rating')
    return [...products].sort((a, b) => a.rating - b.rating);
  if (sort === 'high-rating')
    return [...products].sort((a, b) => b.rating - a.rating);
  return [...products];
};

const useFilters = (products: IProduct[], filters: string[]) => {
  let result = [...products];

  if (filters.length === 0) return result;
  if (filters.includes('checked'))
    result = result.filter((product) => product.checked === true);
  return result;
};

const useFilter = (
  products: IProduct[] | null,
  sort: string,
  search: string,
  filters: string[]
) => {
  if (products === null) return null;
  const sortedProducts = useSort(products, sort);
  const filteredProducts = useFilters(sortedProducts, filters);

  return filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
};

export default useFilter;
