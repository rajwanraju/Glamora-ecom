import { type RootState, store } from '@store/index';
import { setUserLogout } from '@store/slices/authSlice';
import axios, { type AxiosResponse } from 'axios';

export interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  message?: string;
}

/**
 * Create an axios instance with the base URL.
 *
 * @returns {Object} The axios instance.
 */
const ApiService = axios.create({
  baseURL: (process.env.API_BASE_URL ?? '') + (process.env.API_SUFFIX_URL ?? ''),
});

/**
 * Intercept the request before it is sent.
 *
 * @param {Object} config - The request configuration.
 * @returns {Object} The modified request configuration.
 */
ApiService.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json';

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (config.data && config.headers['Content-Type'] === 'application/json') {
      config.headers['Content-Type'] = 'application/json';
    }

    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers.Pragma = 'no-cache';
    config.headers.Expires = 0;
    config.headers.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const accessToken = (store?.getState() as unknown as RootState).auth?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  async (error) => {
    return await Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

/**
 * Intercept the response after it is received.
 *
 * @param {Object} res - The response object.
 * @returns {Object} The response data.
 */
ApiService.interceptors.response.use(
  async (res) => {
    return res?.data ?? [];
  },
  async (error) => {
    try {
      if (error?.response?.status === 401) {
        // If unauthorized to logout the user
        store.dispatch(setUserLogout());
      } else if (error?.response) {
        console.error('Error Response: ', error?.response);
      } else if (error.toJSON().message === 'Network Error') {
        console.error(
          'Network Error: ',
          'No internet! Please try again when you have a stable internet connection.'
        );
      } else {
        console.error('Error: ', 'Failed to access. Please try again!');
      }
    } catch (innerError) {
      console.error('Inner Error: ', innerError);
    }

    return await Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default ApiService;
