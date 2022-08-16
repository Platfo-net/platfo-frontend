import actionTypes from "stores/actionTypes";
import { AppDispatch } from "stores/store";

export const selectAccount = (value) => (dispatch: AppDispatch) => {
  dispatch({
    type: actionTypes.SELECTED_ACCOUNT,
    selectedAccount: value,
  });
};
