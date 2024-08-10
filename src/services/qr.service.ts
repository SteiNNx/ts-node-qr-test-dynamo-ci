import { toDataURL } from 'qrcode';
import QRRepository from '../repositories/qr.repository';

class QRService {
    private qrRepository: QRRepository;

    constructor() {
        this.qrRepository = new QRRepository();
    }

    public async generateQRCode(data: string): Promise<string> {
        console.log('Invocación exitosa a generateQRCode con datos:', data);

        try {
            const qrCode = await toDataURL(data); // Genera el código QR como un Data URL
            console.log('Código QR generado exitosamente', qrCode);

            await this.qrRepository.saveQRCodeToDB(data, qrCode);
            console.log('Código QR guardado exitosamente en la base de datos', data, qrCode);

            return qrCode;
        } catch (error: any) {
            console.error('Error generando el código QR:', error.message);
            throw new Error(`Error generating QR code: ${error.message}`);
        }
    }
}

export default QRService;
