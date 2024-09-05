import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4000';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({

    googleSignIn: builder.mutation({
      query: (token) => {
        console.log("Google Sign-In token:", token);
        return {
          url: '/api/auth/googleSignIn',
          method: 'POST',
          body: { token },
        };
      },
    }),

  }),
});


export const { useGoogleSignInMutation,  } = authApi;
