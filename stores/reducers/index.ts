import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth';
import userSlice from './user';
import chatbotSlice from '@/stores/reducers/chatbot';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  chatbot: chatbotSlice.reducer,
});
export default rootReducer;
