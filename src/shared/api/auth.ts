import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { serverUrlApi } from 'shared/constants/urlPath';

const baseUrl = serverUrlApi;

const baseQuery = fetchBaseQuery({
  baseUrl,
  mode: 'cors',
  prepareHeaders: (headers: Headers) => {
    const accessToken = localStorage.getItem('JWT');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const authAPI = createApi({
  reducerPath: 'authAPI',
  tagTypes: [
    'profile',
    'bucket',
    'products',
    'orders',
    'categories',
    'preorder',
  ],
  baseQuery,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (build) => ({}),
});
