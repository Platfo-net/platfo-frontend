import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/stores/reducers';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type RequestState = 'pending' | 'fulfilled' | 'rejected';
