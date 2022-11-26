import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, apiType, axiosType } from '../../store/store';

import { loadUserInfo } from '../user/userSlice';
import { loadModules, userModuleResp } from '../modules/modulesSlice';

import { FormValues } from './formReg';

import { LogFormValues } from './formLog';

interface SessionsResp {
  data: {
    status: 1 | 0;
    data: {
      jwt: string;
    };
  };
}

interface CreateUserResp {
  data: {
    date: {
      id: string;
      email: string;
      firstName: string;
      secondName: string;
      avatarUrl: string;
      createdAt: string;
      updatedAt: string;
      lang: string;
    };
    status: 1 | 0;
  };
}
interface InitialState {
  open: boolean;
  type: 'log' | 'reg' | 'mod';
  status: 'idle' | 'loading' | 'success' | 'rejected';
}

interface modulePrm {
  token: string;
  name: string;
  description: string;
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

      if (response.data.status === 0) {
        throw new Error('Server Error!');
      } else {
        setTimeout(() => {
          dispatch(resetStatus());
          dispatch(openModal('log'));
        }, 500);
      }

      console.log(response);

      return response;
    } catch (error) {
      setTimeout(() => {
        dispatch(resetStatus());
      }, 500);
      return rejectWithValue(error);
    }
  }
);

export const startSession = createAsyncThunk<SessionsResp, SessionBody, { extra: { client: axiosType; api: apiType } }>(
  '@@form/start-session',
  async (createUserBody, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: SessionsResp = await client.post(api.START_SESSION, createUserBody);

      if (response.data.status === 0) {
        throw new Error('Server Error!');
      } else {
        setTimeout(() => {
          dispatch(resetStatus());
        }, 1000);
      }

      dispatch(loadUserInfo(response.data.data.jwt));

      return response;
    } catch (error) {
      setTimeout(() => {
        dispatch(resetStatus());
      }, 1000);
      return rejectWithValue(error);
    }
  }
);

export const createModule = createAsyncThunk<userModuleResp, modulePrm, { extra: { client: axiosType; api: apiType } }>(
  '@@form/create-module',
  async ({ token, name, description }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: userModuleResp = await client.post(
        api.CREATE_MODULE,
        {
          name,
          description,
          private: true,
          editedByOutsiders: true,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTimeout(() => {
        dispatch(resetStatus());
      }, 1000);
      if (response.data.status === 0) {
        throw new Error('something went wrong!');
      } else {
        dispatch(loadModules({ page: 1, token }));
      }

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
    openModal: (state, action: PayloadAction<'log' | 'reg' | 'mod'>) => {
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
      })
      .addCase(createModule.pending, (store) => {
        store.status = 'loading';
      })
      .addCase(createModule.rejected, (store) => {
        store.status = 'rejected';
      })
      .addCase(createModule.fulfilled, (store) => {
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
