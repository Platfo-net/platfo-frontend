import { AxiosResponse } from "axios";
import AccountsService from "services/endpoints/AccountsService";
import actionTypes from "stores/actionTypes";

export const getAccounts = () => async (dispatch) => {
  try {
    const response: AxiosResponse = await AccountsService.getAccounts();
    dispatch({ type: actionTypes.ACCOUNT_LIST, accountList: response.data });
  } catch (e) {}
};
