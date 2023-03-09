import UserData, { IUserData } from 'shared/constants/types';
import { authAPI } from './auth';
import {
  IOrderData,
  IOrderProducts,
  IProduct,
  OrderData,
} from './types/interfaces';

export const clientEndpoints = authAPI.injectEndpoints({
  endpoints: (build) => ({
    clientProfile: build.query<UserData, unknown>({
      query: () => ({
        url: '/client/profile',
        method: 'GET',
      }),
      providesTags: ['profile'],
    }),
    clientOrders: build.query<OrderData[], unknown>({
      query: () => ({
        url: '/client/orders',
        method: 'GET',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providesTags: (result) => ['orders'],
    }),
    clientOrder: build.query<IOrderProducts, string>({
      query: (orderId) => ({
        url: `/client/orders/${orderId}`,
        method: 'GET',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providesTags: (result) => ['orders'],
    }),
    bucket: build.query<IProduct[], unknown>({
      query: () => ({
        url: `/client/bucket`,
        method: 'GET',
      }),
      providesTags: () => ['bucket'],
    }),
    clientUpdateProfile: build.mutation<unknown, IUserData>({
      query: (updateData) => ({
        url: `/client/profile`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['profile'],
    }),
    removeItemFromBucket: build.mutation<unknown, string>({
      query: (productId) => ({
        url: `/client/bucket/items/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bucket'],
    }),
    removeGroupItemsFromBucket: build.mutation<unknown, string>({
      query: (productId) => ({
        url: `/client/bucket/items/${productId}/all`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bucket'],
    }),
    clearBucket: build.mutation({
      query: () => ({
        url: `/client/bucket`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bucket'],
    }),
    clientSetOrderStatus: build.mutation<
      unknown,
      { orderId: string; status: 'COMPLETED' | 'PAYED' }
    >({
      query: ({ orderId, status }) => ({
        url: `/client/orders/${orderId}?orderStatus=${status}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['orders'],
    }),
    clientPostOrder: build.mutation<IOrderProducts, IOrderData[]>({
      query: (data) => ({
        url: `/client/orders`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['orders', 'bucket'],
    }),
  }),
});
