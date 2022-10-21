import { IProduct } from '../../../shared/api/types/interfaces';
import { IFilters } from '../ui/FilterProducts';

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

const useFilters = (products: IProduct[], filters: IFilters) => {
  let result = [...products];

  if (filters.checked)
    result = result.filter((product) => product.checked === true);
  return result;
};

const useRange = (products: IProduct[], range: number[]) => {
  let result = [...products];

  if (range.length !== 2) return result;
  const [min, max] = range;
  result = result.filter(
    (product) => product.price >= min && product.price <= max
  );
  return result;
};

const useFilter = (
  products: IProduct[] | null,
  sort: string,
  search: string,
  filters: IFilters,
  range: number[]
) => {
  if (products === null) return null;
  const sortedProducts = useSort(products, sort);
  const rangedProducts = useRange(sortedProducts, range);
  const filteredProducts = useFilters(rangedProducts, filters);

  return filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
};

export default useFilter;
