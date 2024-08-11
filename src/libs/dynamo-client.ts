import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    DYNAMODB_DATABASE_ENDPOINT,
} from '@constants/app.constants';

/**
 * Configuración y creación del cliente DynamoDB.
 * 
 * Este cliente se utilizará para interactuar con DynamoDB en AWS. 
 * Asegúrate de que las credenciales y la región estén correctamente configuradas.
 * 
 * La configuración incluye:
 *  - Región de AWS
 *  - Credenciales de acceso (Access Key ID y Secret Access Key)
 */

// Verifica que las credenciales y la región estén definidas.
// Si alguna de estas variables es undefined, lanza un error para evitar fallos en tiempo de ejecución.
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error('AWS credentials and region must be defined in environment variables or configuration.');
}

// Crea una instancia del cliente DynamoDB con las credenciales y la región configuradas.
// Las credenciales se proporcionan explícitamente para asegurar la autenticación adecuada con AWS.
const dynamoClient = new DynamoDBClient({
    region: AWS_REGION as string,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID as string,
        secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
    },
    endpoint: DYNAMODB_DATABASE_ENDPOINT
});

export default dynamoClient;
