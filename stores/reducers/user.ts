import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { RequestState } from '@/stores/store';

type UserState = {
  isDark: boolean;
  requestState?: RequestState;
  error?: SerializedError;
};

const initialState: UserState = {
  isDark: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { changeTheme } = userSlice.actions;

export default userSlice;

export type { UserState };
