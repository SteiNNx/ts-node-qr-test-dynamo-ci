import QRService from '@services/qr.service';
import QRRepository from '@repositories/qr.repository';
import { toDataURL } from 'qrcode';
import { ValidationError } from '@exceptions/app-errors.exception';
import logger from '@libs/logger.lib';

jest.mock('@repositories/qr.repository');
jest.mock('qrcode', () => ({ toDataURL: jest.fn() }));
jest.mock('@libs/logger.lib', () => ({
    info: jest.fn(),
    error: jest.fn(),
}));

const qrRepositoryMock = QRRepository as jest.MockedClass<typeof QRRepository>;

describe('QRService', () => {
    let qrService: QRService;

    beforeEach(() => {
        qrService = new QRService();
    });

    it('should generate a QR code and save it to the database', async () => {
        const qrCode = 'sampleQRCode';
        (toDataURL as jest.Mock).mockResolvedValue(qrCode);
        qrRepositoryMock.prototype.saveQRCodeToDB.mockResolvedValue({ qrCode });

        const result = await qrService.generateQRCode('sampleData');

        expect(toDataURL).toHaveBeenCalledWith('sampleData');
        expect(qrRepositoryMock.prototype.saveQRCodeToDB).toHaveBeenCalledWith('sampleData', qrCode);
        expect(result).toEqual({ qrCode });
        expect(logger.info).toHaveBeenCalledWith('Código QR generado exitosamente:', { qrCode });
    });

    it('should throw ValidationError if validation fails', async () => {
        await expect(qrService.generateQRCode('')).rejects.toThrow(ValidationError);
        expect(logger.error).toHaveBeenCalledWith('Error de validación:', expect.any(Object));
    });

    it('should throw error if QR code generation fails', async () => {
        const error = new Error('QR Generation Error');
        (toDataURL as jest.Mock).mockRejectedValue(error);

        await expect(qrService.generateQRCode('sampleData')).rejects.toThrow(error);
        expect(logger.error).toHaveBeenCalledWith('Error generando el código QR:', { error: error.message });
    });
});
