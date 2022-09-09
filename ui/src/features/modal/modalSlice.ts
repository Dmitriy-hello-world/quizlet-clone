import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store/store';

interface InitialState {
  open: boolean;
  type: 'log' | 'reg';
}

const initialState: InitialState = {
  open: false,
  type: 'log',
};
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
});

export const modalReducer = modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;

export const modalInfo = (store: RootState) => ({ open: store.modal.open, type: store.modal.type });
