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
  };
  status: 'idle' | 'loading' | 'rejected' | 'received';
}

interface userInfoResp {
  data: {
    id: string;
    email: string;
    firstName: string;
    secondName: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  status: 1 | 0;
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
  },
  status: 'idle',
};

export const loadUserInfo = createAsyncThunk<userInfoResp, string, { extra: { client: axiosType; api: apiType } }>(
  '@@form/create-user',
  async (token, { rejectWithValue, extra: { client, api } }) => {
    try {
      const response: userInfoResp = await client.post(api.GET_USER_INFO, {
        Headers: {
          Authorization: token,
        },
      });

      if (response.status === 0) {
        throw new Error('incorrect token!');
      }

      localStorage.setItem('token', token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserInfo.pending, (store) => {
        store.status = 'loading';
      })
      .addCase(loadUserInfo.rejected, (store) => {
        store.status = 'rejected';
      })
      .addCase(loadUserInfo.fulfilled, (store, action) => {
        store.status = 'received';
        store.user = action.payload.data;
      });
  },
});

export const userReducer = userSlice.reducer;

export const getUserInfoSelector = (state: RootState) => state.user;
