import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { RequestState } from '@/stores/store';
import { tokenObj } from '@/lib/token';
import AuthService from '@/services/endpoints/AuthService';
import { Body_Auth_AccessToken, Res_Auth_AccessToken } from '@/types/api';

type AuthState = {
  token: string;
  requestState?: RequestState;
  error?: SerializedError;
};

const initialState: AuthState = {
  token: '',
};

const login = createAsyncThunk<Res_Auth_AccessToken, Body_Auth_AccessToken>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.postLogin(data);
      tokenObj.setToken(response.data.access_token);
      return response.data;
    } catch (error) {
      tokenObj.removeToken();
      return rejectWithValue({ error: 'Invalid login request' });
    }
  }
);

const logout = createAsyncThunk('auth/logout', async () => {
  tokenObj.removeToken();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      token: payload.access_token,
      requestState: 'fulfilled',
      error: undefined,
    }));
    builder.addCase(logout.fulfilled, () => initialState);

    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.requestState = 'pending';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.error = (payload as { error: SerializedError })?.error;
          state.requestState = 'rejected';
        }
      );
  },
});

export default authSlice;
export { login, logout };
export type { AuthState };
