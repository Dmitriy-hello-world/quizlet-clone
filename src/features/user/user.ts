import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface InitialState {
  id: null | string;
  email: null | string;
  firstName: null | string;
  secondName: null | string;
  avatarUrl: null | string;
  createdAt: null | string;
  updatedAt: null | string;
  userToken: null | string;
}
const initialState: InitialState = {
  id: null,
  email: null,
  firstName: null,
  secondName: null,
  avatarUrl: null,
  createdAt: null,
  updatedAt: null,
  userToken: null,
};

export const loadUser = createAsyncThunk('@@user/load-user', () => {
  return {};
});

const headerAccountSlce = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
});

export const headerAccountReducer = headerAccountSlce.reducer;
