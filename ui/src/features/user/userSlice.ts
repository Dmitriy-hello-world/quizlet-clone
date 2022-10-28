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
  isAuthorized: boolean;
}

interface userInfoResp {
  data: {
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
  };
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
  isAuthorized: false,
};

export const loadUserInfo = createAsyncThunk<userInfoResp, string, { extra: { client: axiosType; api: apiType } }>(
  '@@user/load-user-info',
  async (token, { rejectWithValue, extra: { client, api } }) => {
    try {
      const response: userInfoResp = await client.get(api.GET_USER_INFO, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      }

      localStorage.setItem('token', token);
      return response;
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.isAuthorized = false;
      state.user = initialState.user;
      state.status = 'idle';
    },
  },
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
        store.user = action.payload.data.data;
        store.isAuthorized = true;
      });
  },
});

export const userReducer = userSlice.reducer;

export const { logOutUser } = userSlice.actions;

export const getUserInfoSelector = (state: RootState) => ({
  user: state.user.user,
  isAuthorized: state.user.isAuthorized,
});
