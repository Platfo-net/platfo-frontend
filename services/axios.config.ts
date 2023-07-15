import axios, { AxiosInstance } from 'axios';
import getConfig from 'next/config';
import { tokenObj } from '@/lib/token';
import showNotify, {
  SnackbarSettings,
} from '@/components/feedback/Notification/snackbar';
import { Path } from '@/constants/enums';
const { publicRuntimeConfig } = getConfig();

type constructorType = {
  suffix?: string;
  baseUrl?: string;
};

class BaseApi {
  protected $axios: AxiosInstance;

  constructor({
    suffix,
    baseUrl = publicRuntimeConfig.BASE_URL,
  }: constructorType) {
    this.$axios = axios.create({
      baseURL: `${baseUrl}${suffix ? `/${suffix}` : ''}`,
    });
    this.requestInterceptors();
    this.responseInterceptors();
  }

  requestInterceptors() {
    this.$axios.interceptors.request.use(
      (config) => {
        const token = tokenObj.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }

  responseInterceptors() {
    this.$axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const RES400 = error?.response?.status === 400 || false;
        const RES401 = error?.response?.status === 401 || false;
        const RES403 = error?.response?.status === 403 || false;
        const RES404 = error?.response?.status === 404 || false;
        const RES409 = error?.response?.status === 409 || false;
        const RES422 = error?.response?.status === 422 || false;
        const RES500 = error?.response?.status >= 500 || false;

        if (RES401) {
          showNotify({
            text: error?.response?.data.detail,
          } as SnackbarSettings);
          throw error;
        }

        if (RES422) {
          showNotify({
            text: 'Haji Backende 😁',
          } as SnackbarSettings);
          throw error;
        }

        if (RES404) {
          showNotify({
            text: 'Haji Backende 😁',
          } as SnackbarSettings);
          // showNotify({
          //   text: error?.response?.data.detail,
          // } as SnackbarSettings);
          throw error;
        }

        if (RES403) {
          tokenObj.removeToken();
          location.replace(Path.Login);
          throw error;
        }

        if (RES409) {
          showNotify({
            text: error?.response?.data.detail,
          } as SnackbarSettings);
          throw error;
        }

        if (RES400) {
          showNotify({
            text: error?.response?.data.detail,
          } as SnackbarSettings);
          throw error;
        }
        if (RES500) {
          showNotify({
            text: 'Haji Backende 😁',
          } as SnackbarSettings);
          throw error;
        }

        if (!error.response) {
          showNotify({
            text: 'Check your Network!',
          } as SnackbarSettings);
          throw error;
        }

        return Promise.reject(error);
      }
    );
  }
}

export default BaseApi;
