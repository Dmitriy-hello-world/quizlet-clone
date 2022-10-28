import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosType, apiType, RootState } from '../../store/store';

import { ModuleType } from './../modules/modulesSlice';

export interface WordType {
  createdAt: string;
  definition: string;
  id: string;
  imageUrl: string;
  moduleId: string;
  repeatAt: string;
  term: string;
  updatedAt: string;
}
interface InitialState {
  words: WordType[];
  status: 'idle' | 'loading' | 'rejected' | 'received';
  totalCount: number;
  moduleInfo: ModuleType;
  currentPhoto: string;
}

interface ModulePrms {
  id: string;
  token: string;
}

interface UpdtModPrms {
  id: string;
  token: string;
  body: {
    name: string;
    description: string;
    private: boolean;
    editedByOutsiders: boolean;
  };
}

interface UploadImgType {
  token: string;
  body: FormData;
}

interface AsyncParams {
  extra: { client: axiosType; api: apiType };
}

interface ResponseTypes {
  data: {
    data: WordType[];
    meta: { totalCount: number; filteredCount: number; limit: number; offset: number };
    status: 1 | 0;
  };
}

interface RespForModule {
  data: {
    data: {
      createdAt: string;
      description: string;
      editedByOutsiders: boolean;
      id: string;
      name: string;
      private: boolean;
      updatedAt: string;
      userId: string;
    };
    status: 0 | 1;
  };
}

interface RespForImg {
  data: {
    data: { name: string; originalName: string; key: string; location: string; extention: string };
    status: 0 | 1;
  };
}

interface CreateWordPrms {
  token: string;
  body: {
    moduleId: string;
    term: string;
    definition: string;
    imageUrl: string;
  };
}

interface CreateWordResp {
  data: {
    data: {
      createdAt: string;
      definition: string;
      id: string;
      imageUrl: string;
      moduleId: string;
      repeatAt: string;
      term: string;
      updatedAt: string;
    };
    status: 0 | 1;
  };
}

const initialState: InitialState = {
  words: [],
  status: 'idle',
  totalCount: 0,
  moduleInfo: {
    createdAt: '',
    description: '',
    editedByOutsiders: false,
    id: '',
    name: '',
    private: true,
    updatedAt: '',
    userId: '',
  },
  currentPhoto: '',
};

export const loadWords = createAsyncThunk<ResponseTypes, ModulePrms, AsyncParams>(
  '@@module/load-words',
  async ({ id, token }, { rejectWithValue, extra: { client, api } }) => {
    try {
      const response: ResponseTypes = await client.get(api.GET_WORDS_BY_ID(id), {
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

export const loadModule = createAsyncThunk<RespForModule, ModulePrms, AsyncParams>(
  '@@module/load-module',
  async ({ id, token }, { rejectWithValue, extra: { client, api } }) => {
    try {
      const response: RespForModule = await client.get(api.GET_MODULE_BY_ID(id), {
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

export const updateModule = createAsyncThunk<RespForModule, UpdtModPrms, AsyncParams>(
  '@@module/update-module',
  async ({ id, token, body }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: RespForModule = await client.put(api.UPDATE_MODULE_BY_ID(id), body, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      } else {
        dispatch(loadModule({ id, token }));
      }

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const uploadImg = createAsyncThunk<RespForImg, UploadImgType, AsyncParams>(
  '@@module/load-img',
  async ({ token, body }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: RespForImg = await client.post(api.UPLOAD_IMG, body, {
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

export const createWord = createAsyncThunk<CreateWordResp, CreateWordPrms, AsyncParams>(
  '@@module/create-word',
  async ({ token, body }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: CreateWordResp = await client.post(api.CREATE_WORD, body, {
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
  name: '@@module',
  initialState,
  reducers: {
    deleteCurrentPhoto: (store) => {
      store.currentPhoto = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWords.pending, (store) => {
        store.status = 'loading';
      })
      .addCase(loadWords.rejected, (store) => {
        store.status = 'rejected';
      })
      .addCase(loadWords.fulfilled, (store, action) => {
        store.status = 'received';
        store.totalCount = action.payload.data.meta.totalCount;
        store.words = action.payload.data.data;
      })
      .addCase(loadModule.fulfilled, (store, action) => {
        store.moduleInfo = action.payload.data.data;
      })
      .addCase(uploadImg.fulfilled, (store, action) => {
        store.currentPhoto = action.payload.data.data.key;
      })
      .addCase(createWord.fulfilled, (store, action) => {
        store.currentPhoto = '';
        store.words = [action.payload.data.data, ...store.words];
      });
  },
});

export const { deleteCurrentPhoto } = moduleSlice.actions;

export const moduleReducer = moduleSlice.reducer;

export const getWords = (state: RootState) => state.module.words;

export const getModule = (state: RootState) => state.module.moduleInfo;

export const getCurrentUrl = (state: RootState) => state.module.currentPhoto;
