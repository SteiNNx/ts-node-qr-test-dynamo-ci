// src/exceptions/Errors.ts

import {
    CLIENT_MESSAGES,
    ERROR_MESSAGES,
    HTTP_STATUS_CODE,
} from "@constants/app.constants";


// Clase base para todos los errores personalizados
export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public clientMessage: string;

    constructor(message: string, statusCode: number, clientMessage: string, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.clientMessage = clientMessage;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Error para recursos no encontrados (404)
export class NotFoundError extends AppError {
    constructor(message: string = ERROR_MESSAGES.NOT_FOUND) {
        super(message, HTTP_STATUS_CODE.NOT_FOUND, CLIENT_MESSAGES.NOT_FOUND);
    }
}

// Error de negocio (Business Error)
export class BusinessError extends AppError {
    constructor(message: string = ERROR_MESSAGES.BUSINESS) {
        super(message, HTTP_STATUS_CODE.BAD_REQUEST, CLIENT_MESSAGES.BUSINESS);
    }
}

// Error de validación (ValidationError)
export class ValidationError extends AppError {
    constructor(message: string = ERROR_MESSAGES.VALIDATION) {
        super(message, HTTP_STATUS_CODE.BAD_REQUEST, CLIENT_MESSAGES.VALIDATION);
    }
}

// Error de base de datos (DBError)
export class DBError extends AppError {
    constructor(message: string = ERROR_MESSAGES.DB) {
        super(message, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, CLIENT_MESSAGES.DB);
    }
}

// Error de servicio (ServiceError)
export class ServiceError extends AppError {
    constructor(message: string = ERROR_MESSAGES.SERVICE) {
        super(message, HTTP_STATUS_CODE.BAD_REQUEST, CLIENT_MESSAGES.SERVICE);
    }
}
