import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosType, apiType, RootState } from '../../store/store';

interface module {
  createdAt: string;
  description: string;
  editedByOutsiders: boolean;
  id: string;
  name: string;
  private: boolean;
  updatedAt: string;
  userId: string;
}

interface InitialState {
  modules: module[];
  status: 'idle' | 'loading' | 'rejected' | 'received';
}

export interface userModuleResp {
  data: {
    data: module[];
    status: 1 | 0;
  };
}

const initialState: InitialState = {
  modules: [],
  status: 'idle',
};

export const loadModules = createAsyncThunk<userModuleResp, string, { extra: { client: axiosType; api: apiType } }>(
  '@@modules/load-modules',
  async (token, { rejectWithValue, extra: { client, api } }) => {
    try {
      const response: userModuleResp = await client.get(api.GET_ALL_MODULES, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      }

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const moduleSlice = createSlice({
  name: '@@modules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadModules.pending, (store) => {
        store.status = 'loading';
      })
      .addCase(loadModules.rejected, (store) => {
        store.status = 'rejected';
      })
      .addCase(loadModules.fulfilled, (store, action) => {
        store.status = 'received';
        store.modules = action.payload.data.data;
      });
  },
});

export const moduleReducer = moduleSlice.reducer;

export const getModules = (state: RootState) => state.modules.modules;
