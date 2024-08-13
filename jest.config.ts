import type { Config } from 'jest';

const config: Config = {
  // Utiliza ts-jest para transformar archivos TypeScript antes de ejecutarlos en Jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  
  // Define el entorno de prueba como Node.js
  testEnvironment: 'node',
  
  // Patrón para encontrar los archivos de prueba (todos los archivos .test.ts)
  testMatch: ['**/*.test.ts'],
  
  // Extensiones de archivo que Jest debe manejar
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  
  // Directorio donde se generará el informe de cobertura
  coverageDirectory: 'coverage',
  
  // Habilita la recopilación de cobertura de código
  collectCoverage: true,
  
  // Define los reporteros de cobertura (genera informes en formato JSON y HTML)
  coverageReporters: ['json', 'html'],
  
  // Configura los alias de módulos para Jest, coincidiendo con los definidos en tsconfig.json
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
