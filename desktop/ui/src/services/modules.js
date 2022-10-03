import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN } from '../constants'

export const modulesApi = createApi({
  reducerPath: 'modulesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/api/v1/' }),
  endpoints: (builder) => ({
    createModule: builder.mutation({
      query: (payload) => ({
        url: 'modules',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': localStorage.getItem(TOKEN),
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useCreateModuleMutation } = modulesApi
