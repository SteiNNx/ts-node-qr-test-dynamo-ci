import pino from 'pino';
import {
    APP_NAME,
    APP_LOG_LEVEL,
} from '@constants/app.constants';

/**
 * Configuración y creación del logger Pino.
 * 
 * Este logger se utiliza para registrar eventos, errores y otras informaciones útiles durante la ejecución de la aplicación.
 * Se recomienda utilizar `pino` debido a su alto rendimiento y flexibilidad.
 * 
 * La configuración incluye:
 *  - Nivel de log (determina qué tan verbosos serán los logs)
 *  - Transporte (para dar formato a los logs)
 */

// Verifica que el nivel de log esté definido. Si no, usa 'info' como valor por defecto.
const logLevel = APP_LOG_LEVEL || 'info';

// Crea una instancia del logger Pino con la configuración personalizada.
// El logger usa el transporte 'pino-pretty' para formatear los logs de manera legible en la consola.
const logger = pino({
    level: logLevel,
    name: `${APP_NAME}`,
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true, // Colorea los logs para mejorar la legibilidad
            translateTime: true, // Traduce la marca de tiempo a un formato legible
            ignore: 'pid,hostname', // Ignora el ID de proceso y el nombre del host en los logs
        },
    },
});

// Exporta el logger para que pueda ser utilizado en cualquier parte de la aplicación.
export default logger;
