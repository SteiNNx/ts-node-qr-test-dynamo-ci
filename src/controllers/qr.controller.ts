import { Request, Response, NextFunction } from 'express';
import QRService from '@services/qr.service';
import logger from '@libs/logger';
import { HTTP_STATUS_CODE } from '@constants/app.constants';

/**
 * Controlador para gestionar las operaciones relacionadas con códigos QR.
 */
class QRController {
  private qrService: QRService;

  /**
   * Constructor de la clase QRController.
   * Inicializa una instancia del servicio QRService.
   */
  constructor() {
    this.qrService = new QRService();
  }

  /**
   * Handler para generar un código QR a partir de los datos proporcionados.
   * 
   * @param {Request} req - El objeto de solicitud de Express, que contiene los datos necesarios para generar el QR.
   * @param {Response} res - El objeto de respuesta de Express, que se utiliza para enviar el código QR generado o un error.
   * 
   * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando la operación está completa.
   */
  public generateQRCodeHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info('Invocación a generateQRCodeHandler con datos:', req.body);

    try {
      const { data } = req.body;
      logger.info('Datos recibidos para generar QR:', { data });

      // Llama al servicio para generar el código QR
      const qrCode = await this.qrService.generateQRCode(data);
      logger.info('Código QR generado exitosamente:', { qrCode });

      // Envía el código QR generado como respuesta
      res.status(HTTP_STATUS_CODE.OK)
        .json({ qrCode });
    } catch (error: any) {
      next(error);
    }
  };
}

export default QRController;
