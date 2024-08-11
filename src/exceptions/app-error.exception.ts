// src/exceptions/app-error.exception.ts

/**
 * Clase que representa un error de aplicación personalizado.
 * 
 * Extiende la clase estándar `Error` para incluir un código de estado HTTP asociado con el error.
 */
export class AppError extends Error {
    /**
     * Constructor de la clase AppError.
     * 
     * @param {string} message - El mensaje de error que describe lo que salió mal.
     * @param {number} [statusCode=500] - El código de estado HTTP asociado con este error. Por defecto, es 500 (Internal Server Error).
     */
    constructor(public message: string, public statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
