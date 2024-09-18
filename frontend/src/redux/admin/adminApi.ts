import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4000';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (credentials) => ({
        url: '/adminapi/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getAllUsers: builder.query({
      query: () => '/adminapi/admin/users',
    }),
    addService: builder.mutation({
      query: (credentials) => {
        console.log('Credentials:', credentials);
        return {
          url: '/adminapi/admin/addservice',
          method: 'POST',
          body: credentials,
        };
      },
    }),
  }),
});

export const { useAdminloginMutation,useGetAllUsersQuery ,useAddServiceMutation  } = adminApi;
