import { AppError, NotFoundError, BusinessError, ValidationError, DBError, ServiceError } from '@exceptions/app-errors.exception';
import { HTTP_STATUS_CODE, ERROR_MESSAGES, CLIENT_MESSAGES } from '@constants/app.constants';

describe('AppError', () => {
    it('should create an instance of AppError with the correct properties', () => {
        const error = new AppError('Test message', 500, 'Client message', true);

        expect(error.message).toBe('Test message');
        expect(error.statusCode).toBe(500);
        expect(error.clientMessage).toBe('Client message');
        expect(error.isOperational).toBe(true);
    });

    it('should capture the stack trace', () => {
        const error = new AppError('Test message', 500, 'Client message');

        expect(error.stack).toBeDefined();
    });

    it('should have operational flag default to true', () => {
        const error = new AppError('Test message', 500, 'Client message');

        expect(error.isOperational).toBe(true);
    });
});

describe('Specific Errors', () => {
    it('should create an instance of NotFoundError with default message', () => {
        const error = new NotFoundError();

        expect(error.message).toBe(ERROR_MESSAGES.NOT_FOUND);
        expect(error.statusCode).toBe(HTTP_STATUS_CODE.NOT_FOUND);
        expect(error.clientMessage).toBe(CLIENT_MESSAGES.NOT_FOUND);
    });

    it('should create an instance of BusinessError with default message', () => {
        const error = new BusinessError();

        expect(error.message).toBe(ERROR_MESSAGES.BUSINESS);
        expect(error.statusCode).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
        expect(error.clientMessage).toBe(CLIENT_MESSAGES.BUSINESS);
    });

    it('should create an instance of ValidationError with default message', () => {
        const error = new ValidationError();

        expect(error.message).toBe(ERROR_MESSAGES.VALIDATION);
        expect(error.statusCode).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
        expect(error.clientMessage).toBe(CLIENT_MESSAGES.VALIDATION);
    });

    it('should create an instance of DBError with default message', () => {
        const error = new DBError();

        expect(error.message).toBe(ERROR_MESSAGES.DB);
        expect(error.statusCode).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
        expect(error.clientMessage).toBe(CLIENT_MESSAGES.DB);
    });

    it('should create an instance of ServiceError with default message', () => {
        const error = new ServiceError();

        expect(error.message).toBe(ERROR_MESSAGES.SERVICE);
        expect(error.statusCode).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
        expect(error.clientMessage).toBe(CLIENT_MESSAGES.SERVICE);
    });
});
