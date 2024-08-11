import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import dynamoClient from '@libs/dynamo-client';
import { qrSchema } from '@schemas/qr.schema';
import logger from '@libs/logger';

class QRRepository {
  /**
   * Saves a QR code to the DynamoDB database.
   * 
   * @param {string} data - The data encoded in the QR code.
   * @param {string} qrCode - The generated QR code in Data URL format.
   * @returns {Promise<void>} - A promise that resolves when the QR code has been successfully saved.
   * @throws {Error} - Throws an error if the QR code cannot be saved to the database.
   */
  public async saveQRCodeToDB(data: string, qrCode: string): Promise<void> {
    logger.info('Successful invocation of saveQRCodeToDB with data:', { data, qrCode });

    try {
      // Input validation
      qrSchema.parse({ data });
      logger.info('Data validation successful');

      // Get the current date and time in ISO format
      const insertionDate = new Date().toISOString();

      // Save the QR code to DynamoDB
      await dynamoClient.send(
        new PutItemCommand({
          TableName: process.env.DYNAMO_TABLE_NAME!,
          Item: {
            id: { S: data },
            qrCode: { S: qrCode },
            insertionDate: { S: insertionDate },
          },
        })
      );

      logger.info('QR code successfully saved to DynamoDB:', { data, qrCode, insertionDate });
    } catch (error: any) {
      logger.error('Error saving QR code to DynamoDB:', { error: error.message });
      throw new Error(`Error saving QR code to DB: ${error.message}`);
    }
  }
}

export default QRRepository;
