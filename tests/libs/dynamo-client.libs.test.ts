import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import dynamoClient from '@libs/dynamo-client.lib';

jest.mock('@aws-sdk/client-dynamodb');

describe('dynamoClient', () => {
    it('should create an instance of DynamoDBClient with correct configuration', () => {
        // Si dynamoClient es una instancia, no lo llames como función.
        expect(DynamoDBClient).toHaveBeenCalledWith({
            region: expect.any(String),
            credentials: {
                accessKeyId: expect.any(String),
                secretAccessKey: expect.any(String),
            },
            endpoint: expect.any(String)
        });
    });

    it('should throw an error if AWS credentials or region are not defined', () => {
        process.env.AWS_ACCESS_KEY_ID = undefined;
        process.env.AWS_SECRET_ACCESS_KEY = undefined;
        process.env.AWS_REGION = undefined;

        expect(() => {
            // Si dynamoClient es una instancia, simplemente importa el módulo
            // en lugar de llamarlo como función.
            require('@libs/dynamo-client.lib');
        }).toThrow('AWS credentials and region must be defined in environment variables or configuration.');
    });
});
