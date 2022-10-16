import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { sessionsApi } from '../services/sessions'
import { usersApi } from '../services/users'
import { modulesApi } from '../services/modules'
import { wordsApi } from '../services/words'
import sessionSlice from '../features/sessions/sessionSlice'

export const store = configureStore({
  reducer: {
    sessions: sessionSlice,
    [sessionsApi.reducerPath]: sessionsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
    [wordsApi.reducerPath]: wordsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
      .concat(sessionsApi.middleware)
      .concat(usersApi.middleware)
      .concat(modulesApi.middleware)
      .concat(wordsApi.middleware)
})

setupListeners(store.dispatch)
