import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const BASE_URL = 'http://localhost:4000';

export const contractorApi = createApi({
  reducerPath: 'contractorApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => {
        console.log("Query function called with contractor:", credentials);
        return {
            url: '/api/contractor/register',
            method: 'POST',
            body: credentials,
        };
    },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/contractor/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = contractorApi;
