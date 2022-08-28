import { Action } from "@reduxjs/toolkit";
import { actionTypes } from "../actionTypes";
import { updateObject } from "../../helpers/updateObject";

export const initialState = {
  isLoggedIn: false,
  language: "fa-IR",
};

export type AuthState = {
  auth: {
    isLoggedIn: boolean;
    language: string;
  };
};

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.LANGUAGE:
      return updateObject(state, {
        language: action.language,
      });
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
