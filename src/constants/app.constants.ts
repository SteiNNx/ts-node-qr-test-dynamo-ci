// src/constants/app.constants.ts
import dotenv from 'dotenv';

dotenv.config();

const {
    APP_ENVIRONMENT,
    APP_DEBUG,
    APP_LOG_LEVEL = 'info',
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION = 'us-east-1',
    DYNAMODB_DATABASE_ENDPOINT,
    DYNAMO_TABLE_NAME = 'qr-codes',
    QR_APP_PORT = 3000,
} = process.env;

export {
    APP_ENVIRONMENT,
    APP_DEBUG,
    APP_LOG_LEVEL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    DYNAMODB_DATABASE_ENDPOINT,
    DYNAMO_TABLE_NAME,
    QR_APP_PORT,
};
