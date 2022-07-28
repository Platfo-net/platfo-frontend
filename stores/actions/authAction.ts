// import { AxiosResponse } from "axios";
// import ProductService from "services/endpoints/ProductService";
import { actionTypes } from "../actionTypes";
// import AuthService from "../../services/endpoints/AuthService";
import { tokenObj } from "../../helpers/token";
import AuthService from "../../services/endpoints/AuthService";
import UserService from "services/endpoints/UserService";

export const loggedOut = () => (dispatch) => {
  tokenObj.removeToken();
  localStorage.clear();
  dispatch({
    type: actionTypes.LOGGED_OUT,
  });
};

export const loggedIn = (data) => async (dispatch) => {
  try {
    const response = await AuthService.postLoginAccessToken(data);
    tokenObj.setToken(response.data.access_token);
    dispatch({ type: actionTypes.LOGGED_IN });
  } catch (e) {}
};

export const register = (data) => async () => {
  try {
    const response = await UserService.postRegisterUser(data);
    //TODO : add notify
  } catch (e) {}
};

export const changeLanguage = (value) => (dispatch) => {
  dispatch({
    type: actionTypes.LANGUAGE,
    language: value,
  });
};
