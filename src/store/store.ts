import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import * as api from './configAPI';

export const store = configureStore({
  reducer: {},
  devTools: true,
  middleware: (setDefaultMiddleware) =>
    setDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
