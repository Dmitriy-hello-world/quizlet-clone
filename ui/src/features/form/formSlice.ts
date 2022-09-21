import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, apiType, axiosType } from '../../store/store';

import { FormValues } from './formReg';

import { LogFormValues } from './formLog';

interface InitialState {
  open: boolean;
  type: 'log' | 'reg';
  status: 'idle' | 'loading' | 'success' | 'rejected';
}

type StartSessionBody = {
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

export const startSession = createAsyncThunk<string, StartSessionBody, { extra: { client: axiosType; api: apiType } }>(
  '@@form/start-session',
  async (createUserBody, { extra: { client, api } }) => {
    return client.post(api.START_SESSION, createUserBody);
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
        store.status = 'loading';
      })
      .addCase(createUser.rejected, (store) => {
        store.status = 'rejected';
      })
      .addCase(createUser.fulfilled, (store, { payload }) => {
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
