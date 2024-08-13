import { Request, Response, NextFunction } from 'express';
import QRService from '@services/qr.service';
import logger from '@libs/logger.lib';
import { HTTP_STATUS_CODE } from '@constants/app.constants';

/**
 * Controlador para gestionar las operaciones relacionadas con códigos QR.
 */
class QRController {
  private qrService: QRService;

  constructor() {
    this.qrService = new QRService();
  }

  /**
   * Handler para generar un código QR a partir de los datos proporcionados.
   */
  public generateQRCodeHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info('Invocación a generateQRCodeHandler con datos:', req.body);

    try {
      const { data } = req.body;
      logger.info('Datos recibidos para generar QR:', { data });

      const qrCode = await this.qrService.generateQRCode(data);
      logger.info('Código QR generado exitosamente:', { qrCode });

      res.status(HTTP_STATUS_CODE.OK).json({ qrCode });
    } catch (error: any) {
      logger.error('Error en generateQRCodeHandler:', { error: error.message });
      next(error);
    }
  };
}

export default QRController;
