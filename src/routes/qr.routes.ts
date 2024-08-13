import { Router } from 'express';
import QRController from '@controllers/qr.controller';

const router = Router();
const qrController = new QRController();

router.post('/generate', qrController.generateQRCodeHandler);

export default router;
