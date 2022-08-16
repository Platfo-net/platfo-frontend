import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { authReducer } from "./reducers/authReducer";
import { chatflowReducer } from "./reducers/chatflowReducer";
import { connectionsReducer } from "./reducers/connectionsReducer";
import { messageReducer } from "./reducers/messageReducer";

export function makeStore() {
  return configureStore({
    reducer: {
      chatflow: chatflowReducer,
      auth: authReducer,
      connections: connectionsReducer,
      message: messageReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
