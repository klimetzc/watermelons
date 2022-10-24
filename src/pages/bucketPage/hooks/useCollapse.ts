import { useMemo } from 'react';
import {
  IProduct,
  IProductWithCount,
} from '../../../shared/api/types/interfaces';

interface ICollapsedProducts {
  [key: string]: IProductWithCount;
}

const useCollapse = (products: IProduct[]) =>
  useMemo(() => {
    const result = [...products].reduce(
      (acc: ICollapsedProducts, product: IProduct) => {
        acc[product.id] = {
          ...product,
          count: (acc[product.id]?.count || 0) + 1,
        };
        return acc;
      },
      {}
    );
    return Object.values(result);
  }, [products]);

export default useCollapse;
