import { Action } from "@reduxjs/toolkit";
import { actionTypes } from "../actionTypes";
import { updateObject } from "./updateObject";

export const initialState = {
  selectedAccount: null,
};

export type MessageState = {
  message: {
    selectedAccount: any;
  };
};

export const messageReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SELECTED_ACCOUNT:
      return updateObject(state, {
        selectedAccount: action.selectedAccount,
      });
    default:
      return state;
  }
};
