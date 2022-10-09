import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN } from '../constants'
import { API_URL } from '../../etc/config'

export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    createWord: builder.mutation({
      query: (payload) => ({
        url: 'words',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': localStorage.getItem(TOKEN),
        },
      }),
      invalidatesTags: ['Post'],
    }),
    updateWord: builder.mutation({
        query: ({ id, ...payload}) => ({
            url: `words/${id}`,
            method: 'PUT',
            body: payload,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem(TOKEN),
            }
        }),
        invalidatesTags: ['Post'],
      }),
      deleteWord: builder.mutation({
        query: (id) => ({
            url: `words/${id}`,
            method: 'DELETE',
            headers : {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem(TOKEN),
            }
        })
      })
  }),
})

export const { useCreateWordMutation, useUpdateWordMutation, useDeleteWordMutation } = wordsApi
