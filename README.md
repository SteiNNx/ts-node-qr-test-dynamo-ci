# TS Node QR Test Dynamo CI

Este proyecto es una aplicación Node.js escrita en TypeScript que genera códigos QR y los guarda en DynamoDB. Incluye un entorno de pruebas configurado con Jest y está diseñado para ser desplegado y ejecutado dentro de contenedores Docker.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Pruebas](#pruebas)
- [Despliegue](#despliegue)
- [Recursos Adicionales](#recursos-adicionales)

## Requisitos Previos

- **Node.js** >= 14.0.0
- **Docker** y **Docker Compose**
- **AWS CLI** (opcional, para interactuar con DynamoDB)

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/usuario/ts-node-qr-test-dynamo-ci.git
   cd ts-node-qr-test-dynamo-ci
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno necesarias en un archivo `.env`. Aquí tienes una configuración mínima:

- **Configuración General del Entorno:**
  - `APP_NAME`: "ts-node-qr-test-dynamo-ci"
  - `APP_ENVIRONMENT`: development
  - `APP_TIMEZONE`: "America/Santiago"
  - `APP_LANG`: es_ES.UTF-8
  - `APP_DEBUG`: true
  - `APP_LOG_LEVEL`: info

- **Configuración de Docker:**
  - `SUITE_PROJECT_QR_APP_NODE`: "suite-ts-node-app"
  - `SUITE_PROJECT_DYNAMODB`: "suite-dynamodb"

- **Configuración de Node.js:**
  - `QR_APP_PORT`: 3000
  - `QR_APP_ENDPOINT`: <http://localhost:3000>
  - `QR_APP_ENDPOINT_HOST_INTERNAL`: <http://host.docker.internal:3000>

- **Configuración de DynamoDB:**
  - `DYNAMODB_DATABASE_HOSTNAME`: dynamo-database
  - `DYNAMODB_DATABASE_CONTAINER_NAME`: dynamo-database
  - `DYNAMODB_DATABASE_IMAGE`: amazon/dynamodb-local:2.4.0
  - `DYNAMODB_DATABASE_PORT`: 8000
  - `DYNAMODB_DATABASE_ENDPOINT`: <http://localhost:8000>
  - `DYNAMODB_DATABASE_ENDPOINT_HOST_INTERNAL`: <http://host.docker.internal:8000>
  - `DYNAMODB_DATABASE_ENVIRONMENT`: Production

- **Configuración de DynamoDB UI Admin:**
  - `DYNAMODB_UI_ADMIN_HOSTNAME`: dynamo-ui-admin
  - `DYNAMODB_UI_ADMIN_CONTAINER_NAME`: dynamo-ui-admin
  - `DYNAMODB_UI_ADMIN_IMAGE`: aaronshaf/dynamodb-admin:4.6.1
  - `DYNAMODB_UI_ADMIN_PORT`: 8001
  - `DYNAMODB_UI_ADMIN_ENDPOINT`: <http://localhost:8001>
  - `DYNAMODB_UI_ADMIN_ENDPOINT_HOST_INTERNAL`: <http://host.docker.internal:8001>

- **Credenciales de AWS CLI (para pruebas, usa credenciales ficticias):**
  - `AWS_ACCESS_KEY_ID`: fakemykeyid
  - `AWS_SECRET_ACCESS_KEY`: fakemysecretaccesskey
  - `AWS_REGION`: us-east-1

- **Configuración de DynamoDB para la Aplicación:**
  - `DYNAMO_TABLE_NAME`: qr-codes

## Uso

1. **Levantar DynamoDB Local:**

   Puedes levantar un entorno local de DynamoDB utilizando Docker y el script correspondiente:

   ```bash
   sh scripts/suit-dynamodb-local.sh # recibe el argumento `--build` para reconstruir todo, se debe ejecutar la primera vez
   ```

2. **Crear la Tabla DynamoDB:**

   Una vez que DynamoDB esté corriendo, crea la tabla definida en tu archivo `.env` con el siguiente comando:

   ```bash
   sh scripts/create-dynamodb-local.sh
   ```

3. **Iniciar la Aplicación:**

   Puedes iniciar la aplicación de dos maneras:

   - Usando Docker para empaquetar y construir la aplicación en un contenedor:

     ```bash
     sh scripts/suit-node-local.sh
     ```

   - O simplemente usando npm para iniciar la aplicación en tu entorno local:

     ```bash
     npm start
     ```

## Estructura del Proyecto

```bash
ts-node-qr-test-dynamo-ci/
├── .vscode/                        # Configuraciones específicas del editor
├── coverage/                       # Directorio para informes de cobertura de pruebas
├── data/                           # Datos persistentes para DynamoDB local
│   ├── dynamodb/                   # Datos de DynamoDB local
├── dist/                           # Archivos compilados de TypeScript
├── scripts/                        # Scripts de construcción y entorno
│   ├── build.sh                    # Script para compilar la aplicación
│   ├── create-dynamodb-local.sh    # Script para crear la tabla DynamoDB local
│   ├── suit-dynamodb-local.sh      # Script para levantar DynamoDB local
│   └── suit-node-local.sh          # Script para levantar la aplicación en Docker
├── src/                            # Código fuente de la aplicación
│   ├── controllers/                # Controladores de la aplicación
│   ├── middlewares/                # Middlewares de la aplicación
│   ├── models/                     # Modelos de datos
│   ├── repositories/               # Repositorios de datos
│   ├── routes/                     # Definición de rutas
│   ├── services/                   # Servicios de la aplicación
│   ├── constants/                  # Constantes y configuración de la aplicación
│   ├── exceptions/                 # Manejo de excepciones
│   ├── libs/                       # Librerías auxiliares
│   └── server.ts                   # Punto de entrada del servidor
├── tests/                          # Pruebas unitarias y de integración
│   └── test.http                   # Prueba unitaria con restclient
├── .env                            # Variables de entorno
├── .gitattributes                  # Configuración de atributos de Git
├── .gitignore                      # Ignorar archivos y directorios en Git
├── docker-compose.yml              # Configuración de Docker Compose
├── Dockerfile                      # Configuración del contenedor Docker
├── jest.config.ts                  # Configuración de Jest
├── package.json                    # Dependencias y scripts de NPM
├── tsconfig.json                   # Configuración de TypeScript
└── README.md                       # Documentación del proyecto
```

## Pruebas

Las pruebas están configuradas con Jest. Puedes ejecutar todas las pruebas y generar un informe de cobertura utilizando el siguiente comando:

```bash
npm test
```

## Despliegue

El despliegue de esta aplicación puede realizarse en cualquier servicio compatible con contenedores Docker. Los scripts de Docker y Docker Compose incluidos facilitan la configuración y el despliegue tanto en entornos locales como en la nube.

## Recursos Adicionales

### Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución para JavaScript del lado del servidor.
- **TypeScript:** Superset de JavaScript que añade tipado estático.
- **Express:** Framework web minimalista para Node.js.
- **Docker & Docker Compose:** Herramientas para crear, implementar y ejecutar aplicaciones en contenedores.
- **AWS SDK for DynamoDB:** Cliente para interactuar con Amazon DynamoDB.
- **Pino:** Biblioteca de registro (logging) rápida y de bajo costo.
- **Helmet:** Middleware de seguridad para aplicaciones Express.
- **QRCode:** Generador de códigos QR.
- **Zod:** Biblioteca para la validación de esquemas de datos.
- **Jest:** Framework de pruebas para JavaScript y TypeScript.
- **ESLint:** Herramienta de linting para mantener la calidad del código.

### Documentación y Recursos

- [Documentación de Node.js](https://nodejs.org/es/docs/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Express](https://expressjs.com/es/)
- [Documentación de Docker](https://docs.docker.com/)
- [Documentación de Docker Compose](https://docs.docker.com/compose/)
- [Documentación de AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)
- [Documentación de Pino](https://getpino.io/#/)
- [Documentación de Helmet](https://helmetjs.github.io/)
- [Documentación de QRCode](https://www.npmjs.com/package/qrcode)
- [Documentación de Zod](https://zod.dev/)
- [Documentación de Jest](https://jestjs.io/docs/getting-started)
- [Documentación de ESLint](https://eslint.org/docs/latest/)
