import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, apiType, axiosType } from '../../store/store';
interface InitialState {
  open: boolean;
  type: 'log' | 'reg';
  status: 'idle' | 'loading' | 'success' | 'rejected';
}

const initialState: InitialState = {
  open: false,
  type: 'log',
  status: 'idle',
};

export const createUser = createAsyncThunk<string, string, { extra: { client: axiosType; api: apiType } }>(
  '@@modal/create-user',
  async (_, { extra: { client, api } }) => {
    return client.get(api.BASE_URL);
  }
);

const modalSlice = createSlice({
  name: '@@modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<'log' | 'reg'>) => {
      state.open = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (store, action) => {})
      .addCase(createUser.rejected, (store, action) => {})
      .addCase(createUser.fulfilled, (store, { payload }) => {});
  },
});

export const modalReducer = modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;

export const modalInfo = (store: RootState) => ({ open: store.modal.open, type: store.modal.type });
