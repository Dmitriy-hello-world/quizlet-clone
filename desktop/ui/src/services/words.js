import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN, API_URL } from '../constants'

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
    getWords: builder.query({
      query: (queries) => ({
        url: queries ? `words?${Object.entries(queries).flatMap(que => que.join('=')).join('&')}` : 'modules',
        headers: {
          'Authorization': localStorage.getItem(TOKEN),
        },
      }),
      transformResponse: ({ data, meta }) => ({ list: data, ...meta })
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

export const { useCreateWordMutation, useGetWordsQuery, useUpdateWordMutation, useDeleteWordMutation } = wordsApi
