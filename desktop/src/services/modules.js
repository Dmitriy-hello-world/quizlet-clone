import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN, API_URL } from '../constants'

export const modulesApi = createApi({
  reducerPath: 'modulesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
    deleteModule : builder.mutation({
      query: (id) => ({
        url: `modules/${id}`,
        method : 'DELETE',
        headers: {
          'Authorization': localStorage.getItem(TOKEN),
        }
      })
    }),
    updateModule : builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `modules/${id}`,
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': localStorage.getItem(TOKEN),
        }
      })
    }),
    getModules: builder.query({
      query: (queries) => ({
        url: queries ? `modules?${Object.entries(queries).flatMap(que => que.join('=')).join('&')}` : 'modules',
        headers: {
          'Authorization': localStorage.getItem(TOKEN),
        },
      }),
      transformResponse: ({ data, meta }) => ({ modules: data, ...meta }),
    }),
    getModule: builder.query({
      query: (id) => ({
        url: `modules/${id}`,
        headers: {
          'Authorization': localStorage.getItem(TOKEN),
        },
      }),
      transformResponse: ({ data }) => data,
    })
  }),
})

export const { useCreateModuleMutation, useGetModulesQuery, useDeleteModuleMutation, useUpdateModuleMutation, useGetModuleQuery } = modulesApi
