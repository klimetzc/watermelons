import { IPreorderSubscribersAll, IPreorder } from './types/interfaces';
import { authAPI } from './auth';

export const preordersEndpoints = authAPI.injectEndpoints({
  endpoints: (build) => ({
    preorderSubscribers: build.query<IPreorderSubscribersAll, unknown>({
      query: (preorderId) => ({
        url: `/preorders/${preorderId}/participations/all`,
        method: 'GET',
      }),
      providesTags: ['preorder'],
    }),
    preorder: build.query<IPreorder, unknown>({
      query: (preorderId) => ({
        url: `/preorders/${preorderId}`,
        method: 'GET',
      }),
      providesTags: ['preorder'],
    }),
    clientPreorders: build.query<IPreorder[], unknown>({
      query: () => ({
        url: `/preorders/all`,
        method: 'GET',
      }),
      providesTags: ['preorder'],
    }),
    participatePreorder: build.mutation<unknown, string>({
      query: (productId) => ({
        url: `/preorders/${productId}/participations`,
        method: 'POST',
      }),
      invalidatesTags: ['orders', 'products', 'categories'],
    }),
  }),
});
