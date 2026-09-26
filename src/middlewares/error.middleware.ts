import type { NextFunction, Request, Response } from 'express';
import { ResponseWrapper } from '../utils/api-response.js';
import { AppError } from '../utils/app-error.js';

export const notFoundHandler = (req: Request, res: Response): void => {
  ResponseWrapper.error(res, 404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`);
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    ResponseWrapper.error(res, err.statusCode, err.message, err.errors);
    return;
  }

  // JSON malformado (body-parser)
  if (err instanceof SyntaxError && 'body' in err) {
    ResponseWrapper.error(res, 400, 'El cuerpo de la petición no es un JSON válido');
    return;
  }

  // El detalle real va solo al log del servidor, nunca al cliente
  console.error(err);
  ResponseWrapper.error(res, 500, 'Error interno del servidor');
};
