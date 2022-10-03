import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, apiType, axiosType } from '../../store/store';

import { loadUserInfo } from '../user/userSlice';

import { FormValues } from './formReg';

import { LogFormValues } from './formLog';

interface SessionsResp {
  status: 1 | 0;
  data: {
    data: {
      jwt: string;
    };
  };
}

interface CreateUserResp {
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

export const createUser = createAsyncThunk<CreateUserResp, FormValues, { extra: { client: axiosType; api: apiType } }>(
  '@@form/create-user',
  async (createUserBody, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: CreateUserResp = await client.post(api.CREATE_USER, createUserBody);

      if (response.status === 0) {
        throw new Error('Server Error!');
      }

      setTimeout(() => {
        dispatch(resetStatus());
        dispatch(openModal('log'));
      }, 500);

      return response;
    } catch (error) {
      dispatch(resetStatus());
      return rejectWithValue(error);
    }
  }
);

export const startSession = createAsyncThunk<SessionsResp, SessionBody, { extra: { client: axiosType; api: apiType } }>(
  '@@form/start-session',
  async (createUserBody, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: SessionsResp = await client.post(api.START_SESSION, createUserBody);

      setTimeout(() => {
        dispatch(resetStatus());
      }, 1000);

      if (response.status === 0) {
        throw new Error('Server Error!');
      }

      dispatch(loadUserInfo(response.data.data.jwt));

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
        store.status = 'loading';
      })
      .addCase(createUser.rejected, (store) => {
        store.status = 'rejected';
      })
      .addCase(createUser.fulfilled, (store) => {
        store.status = 'success';
      })
      .addCase(startSession.pending, (store) => {
        store.status = 'loading';
      })
      .addCase(startSession.rejected, (store) => {
        store.status = 'rejected';
      })
      .addCase(startSession.fulfilled, (store) => {
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
