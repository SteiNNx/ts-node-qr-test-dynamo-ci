import { Request, Response, NextFunction } from 'express';
import { errorNotFoundMiddleware } from '@middlewares/error-not-found.middleware';
import { HTTP_STATUS_CODE } from '@constants/app.constants';

describe('errorNotFoundMiddleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            originalUrl: '/unknown-route'
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should return 404 error with appropriate message', () => {
        errorNotFoundMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODE.NOT_FOUND);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'No se encontró la ruta /unknown-route. Por favor, verifique la URL.',
        });
    });
});
