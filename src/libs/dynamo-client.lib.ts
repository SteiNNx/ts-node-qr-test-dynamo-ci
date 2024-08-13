import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, DYNAMODB_DATABASE_ENDPOINT } from '@constants/app.constants';
import { DBError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger.lib';

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
    const message = 'AWS credentials and region must be defined in environment variables or configuration.';
    logger.error(message);
    throw new DBError(message);
}

const dynamoClient = new DynamoDBClient({
    region: AWS_REGION as string,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID as string,
        secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
    },
    endpoint: DYNAMODB_DATABASE_ENDPOINT
});

export default dynamoClient;
