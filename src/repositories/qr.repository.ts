import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import dynamoClient from '@libs/dynamo-client.lib';
import { DBError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger.lib';
import { v4 as uuidv4 } from 'uuid';

class QRRepository {
    public async saveQRCodeToDB(data: string, qrCode: string): Promise<Record<string, any>> {
        const id = uuidv4();  // Generar un UUID
        const insertionDate = new Date().toISOString();

        const item = {
            id: { S: id },
            data: { S: data },
            qrCode: { S: qrCode },
            insertionDate: { S: insertionDate }
        };

        logger.info('Invocación exitosa de saveQRCodeToDB con datos:', { id, data, qrCode });

        try {
            await dynamoClient.send(new PutItemCommand({
                TableName: process.env.DYNAMO_TABLE_NAME!,
                Item: item,
            }));
            logger.info('Código QR guardado exitosamente en DynamoDB:', { id, data, qrCode, insertionDate });

            // Retornar el objeto creado
            return {
                id,
                data,
                qrCode,
                insertionDate
            };
        } catch (error: any) {
            logger.error('Error al guardar el QR en la base de datos:', { error: error.message });
            throw new DBError();
        }
    }
}

export default QRRepository;
