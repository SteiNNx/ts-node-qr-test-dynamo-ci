import type { Config } from 'jest';

const config: Config = {
  // Usa ts-jest para transformar archivos TypeScript antes de ejecutarlos en Jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  // Especifica el entorno de prueba para Node.js
  testEnvironment: 'node',
  // Define el patrón de coincidencia para encontrar los archivos de prueba
  testMatch: ['**/*.test.ts'],
  // Extensiones de archivo que Jest debe manejar
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  // Directorio donde se generará el informe de cobertura
  coverageDirectory: 'coverage',
  // Habilita la recopilación de cobertura de código
  collectCoverage: true,
  // Define los reporteros de cobertura (en formato JSON y HTML)
  coverageReporters: ['json', 'html'],
  // Configura los alias para Jest que coinciden con los definidos en tsconfig.json
  moduleNameMapper: {
    '^@app$': '<rootDir>/src/app.ts',
    '^@server$': '<rootDir>/src/server.ts',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@exceptions/(.*)$': '<rootDir>/src/exceptions/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@schemas/(.*)$': '<rootDir>/src/schemas/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
};

export default config;
