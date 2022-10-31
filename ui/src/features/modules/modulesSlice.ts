import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosType, apiType, RootState } from '../../store/store';

export interface ModuleType {
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
  modules: ModuleType[];
  filteredModules: ModuleType[];
  status: 'idle' | 'loading' | 'rejected' | 'received';
  totalCount: number;
  page: number;
}

interface ModulePrms {
  page: number;
  token: string;
}

interface DeleteModulePrms {
  id: string;
  page: number;
  token: string;
}

interface AsyncParams {
  extra: { client: axiosType; api: apiType };
}

export interface userModuleResp {
  data: {
    data: ModuleType[];
    meta: {
      filteredCount: number;
    };
    status: 1 | 0;
  };
}

const initialState: InitialState = {
  modules: [],
  filteredModules: [],
  status: 'idle',
  totalCount: 0,
  page: 1,
};

export const loadModules = createAsyncThunk<userModuleResp, ModulePrms, AsyncParams>(
  '@@modules/load-modules',
  async ({ page, token }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: userModuleResp = await client.get(api.GET_MODULES_WITH_PAGINATION(page), {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      } else {
        dispatch(setPage(page));
      }

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const filterModulesByName = createAsyncThunk<userModuleResp, { name: string; token: string }, AsyncParams>(
  '@@modules/search-modules',
  async ({ name, token }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: userModuleResp = await client.get(api.GET_MODULES_BY_NAME(name), {
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

export const deleteModule = createAsyncThunk<string, DeleteModulePrms, AsyncParams>(
  '@@modules/delete-module',
  async ({ id, page, token }, { rejectWithValue, dispatch, getState, extra: { client, api } }) => {
    try {
      const state = getState() as RootState;
      const response: { data: { status: 0 | 1 } } = await client.delete(api.DELETE_MODULE_BY_ID(id), {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      } else {
        if (state.modules.modules.length - 1 <= 0) {
          dispatch(
            loadModules({
              page: page - 1,
              token,
            })
          );
        } else if (state.modules.modules.length - 1 === 11) {
          dispatch(
            loadModules({
              page,
              token,
            })
          );
        }
      }

      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const modulesSlice = createSlice({
  name: '@@modules',
  initialState,
  reducers: {
    setPage: (store, action) => {
      store.page = action.payload;
    },
  },
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
        store.totalCount = action.payload.data.meta.filteredCount;
      })
      .addCase(filterModulesByName.fulfilled, (store, action) => {
        store.filteredModules = action.payload.data.data;
      })
      .addCase(deleteModule.fulfilled, (store, action) => {
        store.modules = store.modules.filter((module) => module.id !== action.payload);
      });
  },
});

export const modulesReducer = modulesSlice.reducer;

const { setPage } = modulesSlice.actions;

export const getModules = (state: RootState) => state.modules.modules;

export const getFilteredModules = (state: RootState) => state.modules.filteredModules;

export const getTotalCount = (state: RootState) => state.modules.totalCount;

export const getModuleInfo = (state: RootState) => ({
  status: state.modules.status,
  totalCount: state.modules.totalCount,
  page: state.modules.page,
});
