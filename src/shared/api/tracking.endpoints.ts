import { authAPI } from './auth';

export const trackingEndpoints = authAPI.injectEndpoints({
  endpoints: (build) => ({
    track: build.query<unknown, unknown>({
      query: (trackNumber: string) => ({
        url: `/tracker/${trackNumber}`,
        method: 'GET',
      }),
    }),
  }),
});
