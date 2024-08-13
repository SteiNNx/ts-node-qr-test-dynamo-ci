import express, { Application } from 'express';
import helmet from 'helmet';

import qrRoutes from '@routes/qr.routes';
import { errorHandlerMiddleware } from '@middlewares/error-handler.middleware';
import { errorNotFoundMiddleware } from '@middlewares/error-not-found.middleware';
import logger from '@libs/logger.lib';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    logger.info('Inicializando la aplicación Express...');

    this.config();
    this.routes();
    this.errorHandling();

    logger.info('Aplicación Express inicializada correctamente.');
  }

  private config(): void {
    logger.info('Configurando Helmet para seguridad...');
    this.app.use(helmet());
    logger.info('Helmet configurado.');

    logger.info('Configurando middleware para manejar JSON...');
    this.app.use(express.json());
    logger.info('Middleware JSON configurado.');
  }

  private routes(): void {
    logger.info('Registrando rutas de la aplicación...');
    this.app.use('/api/qr', qrRoutes);
    logger.info('Rutas registradas: /api/qr');
  }

  private errorHandling(): void {
    logger.info('Registrando middleware para manejo de errores...');
    this.app.use(errorHandlerMiddleware);
    this.app.use(errorNotFoundMiddleware)
    logger.info('Middleware de manejo de errores registrado.');
  }
}

export default new App().app;
