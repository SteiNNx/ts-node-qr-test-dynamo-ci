import QRController from '@controllers/qr.controller';
import { Request, Response, NextFunction } from 'express';
import QRService from '@services/qr.service';
import { HTTP_STATUS_CODE } from '@constants/app.constants';

jest.mock('@services/qr.service');
jest.mock('@libs/logger.lib', () => ({
    info: jest.fn(),
    error: jest.fn(),
}));

const qrServiceMock = QRService as jest.MockedClass<typeof QRService>;

describe('QRController', () => {
    let qrController: QRController;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        qrController = new QRController();
        req = {
            body: {
                data: 'sampleData'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should generate a QR code and return it', async () => {
        const qrCode = 'sampleQRCode';
        qrServiceMock.prototype.generateQRCode.mockResolvedValue(qrCode);

        await qrController.generateQRCodeHandler(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODE.OK);
        expect(res.json).toHaveBeenCalledWith({ qrCode });
    });

    it('should handle errors and pass them to the next middleware', async () => {
        const error = new Error('Something went wrong');
        qrServiceMock.prototype.generateQRCode.mockRejectedValue(error);

        await qrController.generateQRCodeHandler(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
