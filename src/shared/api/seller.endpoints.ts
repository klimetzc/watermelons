import { authAPI } from './auth';
import {
  IProduct,
  IProductPost,
  ISellerOrderProducts,
  ISellerPatch,
  Seller,
} from './types/interfaces';

export const sellerEndpoints = authAPI.injectEndpoints({
  endpoints: (build) => ({
    sellerProfile: build.query<Seller, unknown>({
      query: () => ({
        url: '/seller/profile',
        method: 'GET',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providesTags: (result) => ['profile'],
    }),
    sellerUpdateProfile: build.mutation<unknown, ISellerPatch>({
      query: (data) => ({
        url: '/seller/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    sellerProducts: build.query<IProduct[], unknown>({
      query: () => ({
        url: '/seller/products',
        method: 'GET',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providesTags: (result) => ['products'],
    }),
    sellerOrders: build.query({
      query: () => ({
        url: '/seller/orders',
        method: 'GET',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providesTags: (result) => ['orders'],
    }),
    sellerOrder: build.query<ISellerOrderProducts, string>({
      query: (orderId) => ({
        url: `/seller/orders/${orderId}`,
        method: 'GET',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providesTags: (result) => ['orders'],
    }),
    sellerProduct: build.mutation<IProductPost, IProductPost>({
      query: (data) => ({
        url: '/seller/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
    sellerDeleteProduct: build.mutation<unknown, string>({
      query: (productId) => ({
        url: `/seller/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
    sellerSetOrderStatus: build.mutation<
      unknown,
      { status: 'SHIPPED'; orderId: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/seller/orders/${orderId}/${status}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['orders'],
    }),
  }),
});
