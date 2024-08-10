import express, { Application } from 'express';
import helmet from 'helmet';
import qrRoutes from './routes/qr.routes';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    console.log('Inicializando la aplicación Express...');
    
    this.config();
    this.routes();
    this.errorHandling();
    
    console.log('Aplicación Express inicializada correctamente.');
  }

  private config(): void {
    // Configura Helmet para mejorar la seguridad
    console.log('Configurando Helmet para seguridad...');
    this.app.use(helmet());
    console.log('Helmet configurado.');

    // Middleware para manejar JSON
    console.log('Configurando middleware para manejar JSON...');
    this.app.use(express.json());
    console.log('Middleware JSON configurado.');
  }

  private routes(): void {
    console.log('Registrando rutas de la aplicación...');
    this.app.use('/api/qr', qrRoutes);
    console.log('Rutas registradas: /api/qr');
  }

  private errorHandling(): void {
    console.log('Registrando middleware para manejo de errores...');
    this.app.use(errorHandlerMiddleware);
    console.log('Middleware de manejo de errores registrado.');
  }
}

export default new App().app;
