import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { ApiError, ApiResponse } from 'types/Api';
import {
  NETWORK_ERROR,
  NO_RESPONSE,
  RUNTIME_ERROR,
  SERVER_ERROR,
  UNKNOWN_ERROR,
} from 'constants/error';

/**
 * Note that this will auto prepend our app's hostname and sets headers automatically
 */

export class BaseApiService {
  protected instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  protected post<T = any>(
    url: string,
    data,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return BaseApiService.handleRequest(this.instance.post(url, data, options));
  }

  protected get<T = any>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return BaseApiService.handleRequest(this.instance.get(url, options));
  }

  protected put<T = any>(
    url: string,
    data,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return BaseApiService.handleRequest(this.instance.put(url, data, options));
  }

  protected delete<T = any>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return BaseApiService.handleRequest(this.instance.delete(url, options));
  }

  /**
   * Handle generic error and transform response to app response.
   * @param axiosResponse
   * @private
   */
  private static async handleRequest<T = any>(
    axiosResponse: AxiosPromise<T>,
  ): Promise<ApiResponse> {
    try {
      const response = await axiosResponse;
      return {
        data: response.data,
        originResponse: response,
      };
    } catch (error) {
      let apiError: ApiError = {
        name: NETWORK_ERROR,
        originError: null,
        code: UNKNOWN_ERROR,
        message: '',
      };
      apiError.originError = error;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const data = error.response.data;
        if (data) {
          apiError.message =
            data.message || 'There is something wrong in server!';
          apiError.errors = data.errors;
          apiError.code = SERVER_ERROR;
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        apiError.code = NO_RESPONSE;
        apiError.message = 'Unable to connect to server';
      } else {
        // Something happened in setting up the request that triggered an Error
        apiError.code = RUNTIME_ERROR;
        apiError.message = error.message;
      }
      throw apiError;
    }
  }
}
