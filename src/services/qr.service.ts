import { toDataURL } from 'qrcode';
import { qrSchema } from '@schemas/qr.schema';
import QRRepository from '@repositories/qr.repository';
import { ValidationError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger.lib';

class QRService {
    private qrRepository: QRRepository;

    constructor() {
        this.qrRepository = new QRRepository();
    }

    public async generateQRCode(data: string): Promise<Record<string, any>> {
        logger.info('Invocación exitosa a generateQRCode con datos:', { data });

        try {
            const qrSchemaValidate = qrSchema.safeParse({ data });
            if (!qrSchemaValidate.success) {
                logger.error('Error de validación:', { errors: qrSchemaValidate.error.errors });
                throw new ValidationError();
            }

            const qrCode = await toDataURL(data);
            logger.info('Código QR generado exitosamente:', { qrCode });

            const qrCodeEntity = await this.qrRepository.saveQRCodeToDB(data, qrCode);
            logger.info('Código QR guardado exitosamente en la base de datos:', { data, qrCode });

            return qrCodeEntity;
        } catch (error: any) {
            logger.error('Error generando el código QR:', { error: error.message });
            throw error;
        }
    }
}

export default QRService;
