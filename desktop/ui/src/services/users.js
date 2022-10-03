import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN } from '../constants'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/api/v1/' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: 'users',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    getProfile : builder.query({
      query: () => ({
        url: 'users/profile',
        headers: {
          'Authorization': localStorage.getItem(TOKEN),
        },
      }),
    })
  }),
})

export const { useCreateUserMutation, useGetProfileQuery } = usersApi
