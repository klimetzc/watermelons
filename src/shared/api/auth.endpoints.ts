import { authAPI } from './auth';

export const authEndpoints = authAPI.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      invalidatesTags: (result) => [
        'profile',
        'bucket',
        'products',
        'orders',
        'categories',
      ],
    }),
    signUp: build.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      invalidatesTags: (result) => [
        'profile',
        'bucket',
        'products',
        'orders',
        'categories',
      ],
    }),
  }),
});
