import pino from 'pino';
import logger from '@libs/logger.lib';

jest.mock('pino');

describe('logger', () => {
    it('should create a logger instance with correct configuration', () => {
        expect(pino).toHaveBeenCalledWith(expect.objectContaining({
            level: expect.any(String),
            name: expect.any(String),
            timestamp: expect.any(Function),
            transport: expect.objectContaining({
                target: 'pino-pretty',
                options: expect.objectContaining({
                    colorize: true,
                    translateTime: true,
                    ignore: 'pid,hostname',
                }),
            }),
        }));
    });
});
