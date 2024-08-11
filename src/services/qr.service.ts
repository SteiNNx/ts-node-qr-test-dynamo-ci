import { toDataURL } from 'qrcode';
import QRRepository from '@repositories/qr.repository';
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
     * @throws {Error} - Lanza un error si no se puede generar o guardar el código QR.
     */
    public async generateQRCode(data: string): Promise<string> {
        logger.info('Invocación exitosa a generateQRCode con datos:', { data });

        try {
            // Genera el código QR como un Data URL
            const qrCode = await toDataURL(data);
            logger.info('Código QR generado exitosamente:', { qrCode });

            // Guarda el código QR en la base de datos
            await this.qrRepository.saveQRCodeToDB(data, qrCode);
            logger.info('Código QR guardado exitosamente en la base de datos:', { data, qrCode });

            return qrCode;
        } catch (error: any) {
            logger.error('Error generando el código QR:', { error: error.message });
            throw new Error(`Error generating QR code: ${error.message}`);
        }
    }
}

export default QRService;
