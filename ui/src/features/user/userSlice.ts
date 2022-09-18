import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosType, apiType, RootState } from '../../store/store';

interface InitialState {
  user: {
    id: null | string;
    email: null | string;
    firstName: null | string;
    secondName: null | string;
    avatarUrl: null | string;
    createdAt: null | string;
    updatedAt: null | string;
    userToken?: null | string;
  };
  status: 'idle' | 'loading' | 'rejected' | 'received';
  error: null | string;
}

interface returnType {
  data: typeof initialState.user;
}

const initialState: InitialState = {
  user: {
    id: null,
    email: null,
    firstName: null,
    secondName: null,
    avatarUrl: null,
    createdAt: null,
    updatedAt: null,
    userToken: null,
  },
  status: 'idle',
  error: null,
};

export const loadUser = createAsyncThunk<returnType, undefined, { extra: { client: axiosType; api: apiType } }>(
  '@@user/load-user',
  async (_, { extra: { client, api } }) => {
    return client.get(api.BASE_URL);
  }
);

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (store) => {
        store.status = 'loading';
        store.error = null;
      })
      .addCase(loadUser.rejected, (store) => {
        store.status = 'rejected';
        store.error = 'Ops, something went wrong!';
      })
      .addCase(loadUser.fulfilled, (store, action) => {
        store.status = 'received';
        store.user = action.payload.data;
      });
  },
});

export const userReducer = userSlice.reducer;

export const getUserInfoSelector = (state: RootState) => state.user;
