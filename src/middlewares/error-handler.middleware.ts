// src/middlewares/error-handler.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../exceptions/app-error.exception';

export const errorHandlerMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error',
    });
};
