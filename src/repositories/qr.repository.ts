import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import dynamoClient from '@libs/dynamo-client';
import { DBError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger';

class QRRepository {
  /**
   * Saves a QR code to the DynamoDB database.
   * 
   * @param {string} data - The data encoded in the QR code.
   * @param {string} qrCode - The generated QR code in Data URL format.
   * @returns {Promise<void>} - A promise that resolves when the QR code has been successfully saved.
   * @throws {DBError} - Throws an error if the QR code cannot be saved to the database.
   */
  public async saveQRCodeToDB(data: string, qrCode: string): Promise<void> {
    logger.info('Successful invocation of saveQRCodeToDB with data:', { data, qrCode });

    try {
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
      logger.error('Database error in saveQRCodeToDB:', { error: error.message });

      throw new DBError();
    }
  }
}

export default QRRepository;
