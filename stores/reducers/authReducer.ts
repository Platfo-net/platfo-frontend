import { Action } from "@reduxjs/toolkit";
import { actionTypes } from "../actionTypes";
import { updateObject } from "./updateObject";

export const initialState = {
  isLoggedIn: false,
};

export type AuthState = {
  auth: {
    isLoggedIn: boolean;
  };
};

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return updateObject(state, {
        isLoggedIn: true,
      });
    case actionTypes.LOGGED_OUT:
      return updateObject(state, {
        isLoggedIn: false,
      });
    default:
      return state;
  }
};
