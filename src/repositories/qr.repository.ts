import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import dynamoClient from '@libs/dynamo-client.lib';
import { DBError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger.lib';

class QRRepository {
    public async saveQRCodeToDB(data: string, qrCode: string): Promise<void> {
        logger.info('Invocación exitosa de saveQRCodeToDB con datos:', { data, qrCode });

        try {
            const insertionDate = new Date().toISOString();
            await dynamoClient.send(new PutItemCommand({
                TableName: process.env.DYNAMO_TABLE_NAME!,
                Item: {
                    id: { S: data },
                    qrCode: { S: qrCode },
                    insertionDate: { S: insertionDate },
                },
            }));
            logger.info('Código QR guardado exitosamente en DynamoDB:', { data, qrCode, insertionDate });
        } catch (error: any) {
            logger.error('Error al guardar el QR en la base de datos:', { error: error.message });
            throw new DBError();
        }
    }
}

export default QRRepository;
