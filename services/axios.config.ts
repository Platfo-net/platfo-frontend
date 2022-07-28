import axios from "axios";
import getConfig from "next/config";
import { tokenObj } from "../helpers/token";
const { publicRuntimeConfig } = getConfig();

const isServer = !process.browser;

export const AxiosCancel = axios.CancelToken;

const $axios = axios.create({
  baseURL: publicRuntimeConfig.BASE_URL,
});

$axios.interceptors.request.use(
  (config) => {
    // if (isServer) return config;
    const token = tokenObj.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = `Bearer token`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const RES401 = error?.response?.status === 401 || false;
    const RES403 = error?.response?.status === 403 || false;
    const RES400 = error?.response?.status === 400 || false;
    const RES422 = error?.response?.status === 422 || false;
    const RES500 = error?.response?.status === 500 || false;
    const RES409 = error?.response?.status === 409 || false;

    if (isServer && RES401) {
      // TODO: redirect to login page
      return Promise.reject(error);
    }

    if (RES422) {
      if (isServer) {
        return Promise.reject(error);
      }
      //TODO : notification
    }

    if (RES403) {
      //TODO : notification
    }

    if (RES409) {
      //TODO : notification
    }

    if (RES400) {
      //TODO : notification
    }

    if (RES500) {
      //TODO : notification
    }

    return Promise.reject(error);
  }
);

export default $axios;
