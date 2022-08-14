import { Action } from "@reduxjs/toolkit";
import { actionTypes } from "../actionTypes";
import { updateObject } from "./updateObject";

export const initialState = {
  accountList: [],
};

export type AuthState = {
  connections: {
    accountList: any;
  };
};

export const connectionsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.ACCOUNT_LIST:
      return updateObject(state, {
        accountList: action.accountList,
      });
    default:
      return state;
  }
};
