import { Request, Response } from 'express';
import QRService from '../services/qr.service';
import logger from '../libs/logger';  // Importa el logger

class QRController {
  private qrService: QRService;

  constructor() {
    this.qrService = new QRService(); // Instanciación interna de la dependencia
  }

  public generateQRCodeHandler = async (req: Request, res: Response): Promise<void> => {
    logger.info('Invocación a generateQRCodeHandler con datos:', req.body);

    try {
      const { data } = req.body;
      logger.info('Datos recibidos para generar QR:', { data });

      const qrCode = await this.qrService.generateQRCode(data);
      logger.info('Código QR generado exitosamente:', { qrCode });

      res.status(200).json({ qrCode });
    } catch (error: any) {
      logger.error('Error en generateQRCodeHandler:', { error: error.message });

      res.status(500).json({ error: error.message });
    }
  };
}

export default QRController;
