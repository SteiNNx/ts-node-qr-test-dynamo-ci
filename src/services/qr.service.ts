import { toDataURL } from 'qrcode';
import { qrSchema } from '@schemas/qr.schema';
import QRRepository from '@repositories/qr.repository';
import { ValidationError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger';  // Importa el logger

class QRService {
    private qrRepository: QRRepository;

    constructor() {
        this.qrRepository = new QRRepository();
    }

    /**
     * Genera un código QR a partir de los datos proporcionados y lo guarda en la base de datos.
     * 
     * @param {string} data - Los datos que se codificarán en el código QR.
     * @returns {Promise<string>} - Una promesa que se resuelve con el código QR generado en formato Data URL.
     * @throws {AppError} - Lanza un error si no se puede generar o guardar el código QR.
     */
    public async generateQRCode(data: string): Promise<string> {
        logger.info('Invocación exitosa a generateQRCode con datos:', { data });

        try {
            // Input validation
            const qrSchemaValidate = qrSchema.safeParse({ data });
            if (!qrSchemaValidate.success) {
                throw new ValidationError();
            }

            // Genera el código QR como un Data URL
            const qrCode = await toDataURL(data);
            logger.info('Código QR generado exitosamente:', { qrCode });

            // Guarda el código QR en la base de datos
            await this.qrRepository.saveQRCodeToDB(data, qrCode);
            logger.info('Código QR guardado exitosamente en la base de datos:', { data, qrCode });

            return qrCode;
        } catch (error: any) {
            logger.error('Error generando el código QR:', { error: error.message });
            throw error;
        }
    }
}

export default QRService;
