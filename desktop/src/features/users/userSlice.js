/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => state = action.payload,
  },
})

export const { setUser } = usersSlice.actions

export default usersSlice.reducer
