import { useMemo } from 'react';
import {
  IOrderData,
  IProductWithCount,
} from '../../../shared/api/types/interfaces';

const useOrder = (products: IProductWithCount[]) =>
  useMemo(() => {
    const result: IOrderData[] = [...products].map(
      (product: IProductWithCount) => ({
        id: product.id,
        among: product.count,
      })
    );
    return result;
  }, [products]);

export default useOrder;
