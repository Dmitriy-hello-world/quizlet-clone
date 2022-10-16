/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit'
import { TOKEN } from '../../constants'

const initialState = {
  userAuthorized: !!localStorage.getItem(TOKEN)
}

export const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    login: (state) => void(state.userAuthorized = true),
    logout: (state) => void(state.userAuthorized = false),
  },
})

export const { login, logout } = sessionsSlice.actions

export default sessionsSlice.reducer
