import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { AppError } from '../utils/app-error.js';

type Target = 'body' | 'params';

export const validate =
  (schema: ZodType, target: Target = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || target,
        message: issue.message,
      }));
      next(new AppError(400, 'Error de validación', errors));
      return;
    }

    // body se reemplaza por la versión saneada (trim, sin campos extra); params se conserva
    if (target === 'body') req.body = result.data;
    next();
  };
