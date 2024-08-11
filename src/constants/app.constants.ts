// src/constants/app.constants.ts
import dotenv from 'dotenv';

dotenv.config();

export const APP_NAME = process.env.APP_NAME;
export const APP_ENVIRONMENT = process.env.APP_ENVIRONMENT;
export const APP_DEBUG = process.env.APP_DEBUG === 'true';
export const APP_LOG_LEVEL = process.env.APP_LOG_LEVEL || 'info';
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
export const DYNAMODB_DATABASE_ENDPOINT = process.env.DYNAMODB_DATABASE_ENDPOINT;
export const DYNAMO_TABLE_NAME = process.env.DYNAMO_TABLE_NAME || 'qr-codes';
export const QR_APP_PORT = process.env.QR_APP_PORT ? parseInt(process.env.QR_APP_PORT) : 3000;

export const ERROR_MESSAGES = {
    NOT_FOUND: 'Recurso no encontrado',
    BUSINESS: 'Error de negocio',
    VALIDATION: 'Error de validación',
    DB: 'Error de base de datos',
    SERVICE: 'Error en el servicio',
};

export const CLIENT_MESSAGES = {
    NOT_FOUND: 'El recurso solicitado no está disponible.',
    BUSINESS: 'Ocurrió un error relacionado con las reglas del negocio.',
    VALIDATION: 'Los datos proporcionados no son válidos.',
    DB: 'Ocurrió un error al acceder a la base de datos.',
    SERVICE: 'El servicio no está disponible en este momento.',
};

// Códigos de estado HTTP
export const HTTP_STATUS_CODE = {
    // Successful 2xx
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,

    // Redirection 3xx
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,

    // Client Error 4xx
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,

    // Server Error 5xx
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503,
} as const;
