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
  page: number;
}

interface ModulePrms {
  id: string;
  token: string;
}

interface WordsPrms {
  id: string;
  page: number;
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
interface UpdtWordPrms {
  id: string;
  token: string;
  body: {
    term: string;
    definition: string;
    imageUrl: string;
  };
}

interface UploadImgType {
  token: string;
  id: string;
  body: {
    img: FormData;
    moduleId: string;
    term: string;
    definition: string;
  };
}

interface UploadImgTypeForWord {
  token: string;
  id: string;
  body: {
    img: FormData;
    term: string;
    definition: string;
  };
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

interface RespForWord {
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
    status: 1 | 0;
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
  page: number;
  id: string;
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

interface DeleteModulePrms {
  id: string;
  page: number;
  token: string;
  moduleId: string;
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
  page: 1,
};

export const loadWords = createAsyncThunk<ResponseTypes, WordsPrms, AsyncParams>(
  '@@module/load-words',
  async ({ id, page, token }, { dispatch, rejectWithValue, extra: { client, api } }) => {
    try {
      const response: ResponseTypes = await client.get(api.GET_WORDS_WITH_PAGINATION(id, page), {
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

export const CreateWordWithImg = createAsyncThunk<RespForImg, UploadImgType, AsyncParams>(
  '@@module/create-word-with-img',
  async ({ token, id, body }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: RespForImg = await client.post(api.UPLOAD_IMG, body.img, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      } else {
        dispatch(
          createWord({
            token,
            id,
            page: 1,
            body: {
              moduleId: body.moduleId,
              term: body.term,
              definition: body.definition,
              imageUrl: response.data.data.key,
            },
          })
        );
      }

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createWord = createAsyncThunk<CreateWordResp, CreateWordPrms, AsyncParams>(
  '@@module/create-word',
  async ({ token, id, page, body }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: CreateWordResp = await client.post(api.CREATE_WORD, body, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      } else {
        dispatch(loadWords({ token, id, page: 1 }));
      }

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteWord = createAsyncThunk<string, DeleteModulePrms, AsyncParams>(
  '@@module/delete-word',
  async ({ id, moduleId, page, token }, { rejectWithValue, dispatch, getState, extra: { client, api } }) => {
    try {
      const state = getState() as RootState;
      const response: { data: { status: 0 | 1 } } = await client.delete(api.DELETE_WORD_BY_ID(id), {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      } else {
        if (state.module.words.length - 1 <= 0 && page !== 1) {
          dispatch(
            loadWords({
              id: moduleId,
              page: page - 1,
              token,
            })
          );
        } else if (state.module.words.length - 1 === 7) {
          dispatch(
            loadWords({
              id: moduleId,
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

export const updateWord = createAsyncThunk<RespForWord, UpdtWordPrms, AsyncParams>(
  '@@module/update-word',
  async ({ id, token, body }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: RespForWord = await client.put(api.UPDATE_WORD_BY_ID(id), body, {
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

export const updateWordWithImg = createAsyncThunk<RespForImg, UploadImgTypeForWord, AsyncParams>(
  '@@module/update-word-with-img',
  async ({ token, id, body }, { rejectWithValue, dispatch, extra: { client, api } }) => {
    try {
      const response: RespForImg = await client.post(api.UPLOAD_IMG, body.img, {
        headers: {
          Authorization: token,
        },
      });

      console.log(response);

      if (response.data.status === 0) {
        throw new Error('incorrect token!');
      } else {
        dispatch(
          updateWord({
            token,
            id,
            body: {
              term: body.term,
              definition: body.definition,
              imageUrl: response.data.data.key,
            },
          })
        );
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
    setPage: (store, action) => {
      store.page = action.payload;
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
      .addCase(createWord.fulfilled, (store, action) => {
        store.words = [action.payload.data.data, ...store.words];
      })
      .addCase(deleteWord.fulfilled, (store, action) => {
        store.words = store.words.filter((word) => word.id !== action.payload);
      })
      .addCase(updateWord.fulfilled, (store, action) => {
        store.words = store.words.map((item) => {
          if (item.id === action.payload.data.data.id) {
            return action.payload.data.data;
          } else {
            return item;
          }
        });
      });
  },
});

export const moduleReducer = moduleSlice.reducer;

const { setPage } = moduleSlice.actions;

export const getWords = (state: RootState) => state.module.words;

export const getModule = (state: RootState) => state.module.moduleInfo;

export const getWordsInfo = (state: RootState) => ({
  totalCount: state.module.totalCount,
  page: state.module.page,
});