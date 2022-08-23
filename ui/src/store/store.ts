import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { userReducer } from '../features/user/userSlice';

import * as api from './configAPI';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
  middleware: (setDefaultMiddleware) =>
    setDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
        serializableCheck: false,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type axiosType = typeof axios;
export type apiType = typeof api;

export const useAppDispatch: () => AppDispatch = useDispatch;
