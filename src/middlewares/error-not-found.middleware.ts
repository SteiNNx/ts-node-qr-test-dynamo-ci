import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODE } from '@constants/app.constants';

export const errorNotFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        status: 'error',
        message: `No se encontró la ruta ${req.originalUrl}. Por favor, verifique la URL.`,
    });
};
