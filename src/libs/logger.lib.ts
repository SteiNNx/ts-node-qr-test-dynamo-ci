import pino from 'pino';
import { APP_NAME, APP_LOG_LEVEL } from '@constants/app.constants';

const logLevel = APP_LOG_LEVEL || 'info';

const logger = pino({
    level: logLevel,
    name: `${APP_NAME}`,
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: true,
            ignore: 'pid,hostname',
        },
    },
});

export default logger;
