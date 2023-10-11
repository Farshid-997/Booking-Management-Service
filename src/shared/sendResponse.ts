import { Response } from 'express';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

type IAuthData<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  token?: T | null;
};

export const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    success: data.success,
    statusCode: data.statusCode,

    message: data.message || null,
    data: data.data || null || undefined,
    meta: data.meta || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};
export const reponseAuthFormat = <T>(
  res: Response,
  data: IAuthData<T>
): void => {
  const responseData: IAuthData<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    token: data.token || null,
  };

  res.status(data.statusCode).json(responseData);
};
