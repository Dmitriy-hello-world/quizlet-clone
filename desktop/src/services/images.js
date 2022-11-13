import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN, API_URL } from '../constants'

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    createImage: builder.mutation({
      query: (payload) => {
        const body = new FormData();
        body.append('file', payload);

        return {
          url: 'files/images',
          method: 'POST',
          body,
          headers: {
            'Authorization': localStorage.getItem(TOKEN),
          },
        }
      },
      transformResponse: ({ data }) => data?.key,
      invalidatesTags: ['Post'],
    })
  }),
})

export const { useCreateImageMutation } = imagesApi
