import QRRepository from '@repositories/qr.repository';
import { PutItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DBError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger.lib';

jest.mock('@aws-sdk/client-dynamodb');
jest.mock('@libs/logger.lib', () => ({
    info: jest.fn(),
    error: jest.fn(),
}));

const dynamoClientMock = DynamoDBClient as jest.MockedClass<typeof DynamoDBClient>;

describe('QRRepository', () => {
    let qrRepository: QRRepository;

    beforeEach(() => {
        qrRepository = new QRRepository();
    });

    it('should save QR code to DynamoDB', async () => {
        await qrRepository.saveQRCodeToDB('sampleData', 'sampleQRCode');

        expect(dynamoClientMock.prototype.send).toHaveBeenCalledWith(expect.any(PutItemCommand));
        expect(logger.info).toHaveBeenCalledWith('Código QR guardado exitosamente en DynamoDB:', expect.any(Object));
    });

    it('should throw DBError if there is an error saving QR code', async () => {
        dynamoClientMock.prototype.send.mockRejectedValue(new Error('DynamoDB Error'));

        await expect(qrRepository.saveQRCodeToDB('sampleData', 'sampleQRCode')).rejects.toThrow(DBError);
        expect(logger.error).toHaveBeenCalledWith('Error al guardar el QR en la base de datos:', { error: 'DynamoDB Error' });
    });
});
