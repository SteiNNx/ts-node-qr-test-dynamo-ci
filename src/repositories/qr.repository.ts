import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import dynamoClient from '../libs/dynamo-client';
import { qrSchema } from '../models/qr.model';

class QRRepository {
  public async saveQRCodeToDB(data: string, qrCode: string): Promise<void> {
    console.log('Invocación exitosa a saveQRCodeToDB con datos:', { data, qrCode });

    try {
      // Validación de entrada
      qrSchema.parse({ data });
      console.log('Validación de datos exitosa');

      // Guardar el código QR en DynamoDB
      await dynamoClient.send(
        new PutItemCommand({
          TableName: process.env.DYNAMO_TABLE_NAME!,
          Item: {
            id: { S: data },
            qrCode: { S: qrCode },
          },
        })
      );

      console.log('Código QR guardado exitosamente en DynamoDB', { data, qrCode });
    } catch (error: any) {
      console.error('Error al guardar el código QR en DynamoDB:', error.message);
      throw new Error(`Error saving QR code to DB: ${error.message}`);
    }
  }
}

export default QRRepository;
