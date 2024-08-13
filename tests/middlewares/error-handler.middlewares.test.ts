import { Request, Response, NextFunction } from 'express';
import { errorHandlerMiddleware } from '@middlewares/error-handler.middleware';
import { AppError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger.lib';

jest.mock('@libs/logger.lib', () => ({
    error: jest.fn(),
}));

describe('errorHandlerMiddleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should handle operational errors correctly', () => {
        const error = new AppError('Test Error', 400, 'Client Error');

        errorHandlerMiddleware(error, req as Request, res as Response, next);

        expect(logger.error).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Client Error',
        });
    });

    it('should handle non-operational errors correctly', () => {
        const error = new Error('Test Error');

        errorHandlerMiddleware(error, req as Request, res as Response, next);

        expect(logger.error).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Ocurrió un error inesperado. Inténtelo nuevamente más tarde.',
        });
    });
});
