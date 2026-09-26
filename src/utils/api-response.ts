import type { Response } from 'express';

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  errors: ApiErrorDetail[] | null;
  timestamp: string;
}

const build = <T>(
  success: boolean,
  message: string,
  data: T | null,
  errors: ApiErrorDetail[] | null,
): ApiResponse<T> => ({ success, message, data, errors, timestamp: new Date().toISOString() });

export const ResponseWrapper = {
  success<T>(res: Response, data: T, message = 'Operación exitosa', status = 200): Response {
    return res.status(status).json(build(true, message, data, null));
  },

  created<T>(res: Response, data: T, message = 'Recurso creado'): Response {
    return ResponseWrapper.success(res, data, message, 201);
  },

  error(
    res: Response,
    status: number,
    message: string,
    errors: ApiErrorDetail[] | null = null,
  ): Response {
    return res.status(status).json(build(false, message, null, errors));
  },
};
