// src/middlewares/error-handler.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@exceptions/app-error.exception';
import { HTTP_STATUS_CODE } from '@constants/app.constants';

export const errorHandlerMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.statusCode || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({
            error: err.message || 'Internal Server Error',
        });
};
