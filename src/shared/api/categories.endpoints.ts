import { authAPI } from './auth';
import { ICategory, IProduct, IProductFull } from './types/interfaces';

export const categoriesEndpoints = authAPI.injectEndpoints({
  endpoints: (build) => ({
    categories: build.query<ICategory[], unknown>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      providesTags: (result) => ['categories'],
    }),
    category: build.query<ICategory, string>({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: 'GET',
      }),
    }),
    products: build.query<IProduct[], string>({
      query: (categoryId: string) => ({
        url: `/categories/${categoryId}/items`,
        method: 'GET',
      }),
    }),
    product: build.query<
      IProductFull,
      { categoryId: string; productId: string }
    >({
      query: ({ categoryId, productId }) => ({
        url: `/categories/${categoryId}/items/${productId}`,
        method: 'GET',
      }),
    }),
    addToBucket: build.mutation<
      IProduct,
      { categoryId: string; productId: string }
    >({
      query: ({ categoryId, productId }) => ({
        url: `/categories/${categoryId}/items/${productId}/bucket`,
        method: 'POST',
        params: {
          idCategory: categoryId,
          idItem: productId,
        },
      }),
      invalidatesTags: ['bucket'],
    }),
  }),
});
