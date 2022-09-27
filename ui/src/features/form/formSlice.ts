import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, apiType, axiosType } from '../../store/store';

import { loadUserInfo } from '../user/userSlice';

import { FormValues } from './formReg';

import { LogFormValues } from './formLog';

interface SessionsResp {
  status: 1 | 0;
  data: {
    jwt: string;
  };
}

interface InitialState {
  open: boolean;
  type: 'log' | 'reg';
  status: 'idle' | 'loading' | 'success' | 'rejected';
}

type SessionBody = {
  data: LogFormValues;
};

const initialState: InitialState = {
  open: false,
  type: 'log',
  status: 'idle',
};

export const createUser = createAsyncThunk<string, FormValues, { extra: { client: axiosType; api: apiType } }>(
  '@@form/create-user',
  async (createUserBody, { extra: { client, api } }) => {
    return client.post(api.CREATE_USER, createUserBody);
  }
);

export const startSession = createAsyncThunk<SessionsResp, SessionBody, { extra: { client: axiosType; api: apiType } }>(
  '@@form/start-session',
  async (createUserBody, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: SessionsResp = await client.post(api.START_SESSION, createUserBody);

      if (response.status === 0) {
        throw new Error('Server Error!');
      }

      dispatch(loadUserInfo(response.data.jwt));

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const formSlice = createSlice({
  name: '@@form',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<'log' | 'reg'>) => {
      state.open = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
    },
    resetStatus: (state) => {
      state.open = false;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (store) => {
        console.log('loading');
        store.status = 'loading';
      })
      .addCase(createUser.rejected, (store) => {
        console.log('reject');
        store.status = 'rejected';
      })
      .addCase(createUser.fulfilled, (store, { payload }) => {
        console.log('succes', payload);
        store.status = 'success';
      })
      .addCase(startSession.pending, (store) => {
        store.status = 'loading';
      })
      .addCase(startSession.rejected, (store) => {
        store.status = 'rejected';
      })
      .addCase(startSession.fulfilled, (store, { payload }) => {
        console.log(payload);
        store.status = 'success';
      });
  },
});

export const formReducer = formSlice.reducer;

export const { openModal, closeModal, resetStatus } = formSlice.actions;

export const modalInfo = (store: RootState) => ({
  open: store.form.open,
  type: store.form.type,
  status: store.form.status,
});
