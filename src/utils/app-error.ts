import type { ApiErrorDetail } from './api-response.js';

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errors: ApiErrorDetail[] | null = null,
  ) {
    super(message);
    this.name = 'AppError';
  }

  static notFound(message: string): AppError {
    return new AppError(404, message);
  }
}
