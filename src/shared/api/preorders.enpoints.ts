import { authAPI } from './auth';

export const preordersEndpoints = authAPI.injectEndpoints({
  endpoints: (build) => ({
    participatePreorder: build.mutation<unknown, string>({
      query: (productId) => ({
        url: `/preorders/${productId}/participations`,
        method: 'POST',
      }),
      invalidatesTags: ['orders', 'products', 'categories'],
    }),
  }),
});
