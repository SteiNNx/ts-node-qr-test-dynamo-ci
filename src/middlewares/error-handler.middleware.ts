import { Request, Response, NextFunction } from 'express';
import { AppError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger.lib';
import { HTTP_STATUS_CODE } from '@constants/app.constants';

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof AppError) {
        logger.error(`[${err.statusCode}] ${err.message}`, { stack: err.stack });
        res.status(err.statusCode).json({
            status: 'error',
            message: err.clientMessage,
        });
    } else {
        logger.error(`[${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR}] ${err.message}`, { stack: err.stack });
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Ocurrió un error inesperado. Inténtelo nuevamente más tarde.',
        });
    }
}
