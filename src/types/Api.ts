import { AxiosError, AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
  originResponse: AxiosResponse<T>;
  data: T;
}

export interface ApiError extends Error {
  errors?: { [key: string]: string[] };
  originError?: AxiosError | null;
  code?: string;
}
