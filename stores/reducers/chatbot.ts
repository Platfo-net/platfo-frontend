import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { RequestState } from '@/stores/store';
import { IAccount, Params_Account_All, Res_Account_All } from '@/types/api';
import AccountService from '@/services/endpoints/AccountService';

type ChatbotState = {
  accounts: Res_Account_All;
  requestState?: RequestState;
  error?: SerializedError;
  selectedAccount?: IAccount;
};

const initialState: ChatbotState = {
  accounts: [],
  selectedAccount: undefined,
};

const getAccounts = createAsyncThunk<
  Res_Account_All,
  Params_Account_All | undefined
>('chatbot/login', async (params, { rejectWithValue }) => {
  try {
    const response = await AccountService.getAccounts(params);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: 'error' });
  }
});

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    changeSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ChatbotState>) => {
    builder.addCase(getAccounts.fulfilled, (state, { payload }) => ({
      ...state,
      accounts: payload,
      requestState: 'fulfilled',
      error: undefined,
    }));

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
export const { changeSelectedAccount } = chatbotSlice.actions;
export default chatbotSlice;
export { getAccounts };
export type { ChatbotState };
