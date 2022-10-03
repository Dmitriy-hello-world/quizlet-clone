import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sessionsApi = createApi({
  reducerPath: 'sessionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/api/v1/' }),
  endpoints: (builder) => ({
    createSession: builder.mutation({
      query: (payload) => ({
        url: 'sessions',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useCreateSessionMutation } = sessionsApi
