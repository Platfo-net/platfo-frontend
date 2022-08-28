import { Action } from "@reduxjs/toolkit";
import { actionTypes } from "../actionTypes";
import { updateObject } from "../../helpers/updateObject";

export const initialState = {
  selectedAccount: null,
  selectedUser: null,
};

export type MessageState = {
  message: {
    selectedAccount: any;
    selectedUser: any;
  };
};

export const messageReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SELECTED_ACCOUNT:
      return updateObject(state, {
        selectedAccount: action.selectedAccount,
      });
    case actionTypes.SELECTED_USER:
      return updateObject(state, {
        selectedUser: action.selectedUser,
      });
    default:
      return state;
  }
};
