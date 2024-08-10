# TS Node QR Test Dynamo CI

Este proyecto es una aplicación Node.js escrita en TypeScript que genera códigos QR y los guarda en DynamoDB. Incluye un entorno de prueba configurado con Jest y está diseñado para ser desplegado y ejecutado dentro de contenedores Docker.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts de Construcción y CI](#scripts-de-construcción-y-ci)
- [Pruebas](#pruebas)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

## Requisitos Previos

- Node.js >= 14.0.0
- Docker
- AWS CLI (opcional, para interactuar con DynamoDB)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/ts-node-qr-test-dynamo-ci.git
    cd ts-node-qr-test-dynamo-ci
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

## Configuración

1. Crea un archivo `.env` basado en el ejemplo proporcionado en el repositorio y ajusta las variables según tu entorno:

    ```plaintext
    APP_NAME="QR Node App"
    APP_ENVIRONMENT=development
    QR_APP_PORT=3000
    # ... otras variables de entorno
    ```

2. Para configurar DynamoDB, asegúrate de tener las credenciales de AWS configuradas correctamente en tu entorno.

## Uso

1. Inicia la aplicación en modo desarrollo:

    ```bash
    npm run dev
    ```

2. Para generar un código QR, haz una solicitud POST a `/api/qr/generate` con el siguiente cuerpo:

    ```json
    {
      "data": "Texto a codificar"
    }
    ```

## Estructura del Proyecto

```bash
ts-node-qr-test-dynamo-ci/
├── scripts/                # Scripts de construcción y CI
│   ├── build.sh            # Script para compilar la aplicación
│   └── test.sh             # Script para ejecutar las pruebas
├── src/                    # Código fuente de la aplicación
│   ├── controllers/        # Controladores de la aplicación
│   ├── middlewares/        # Middlewares de la aplicación
│   ├── models/             # Modelos de datos
│   ├── repositories/       # Repositorios de datos
│   ├── routes/             # Definición de rutas
│   ├── services/           # Servicios de la aplicación
│   ├── constants/          # Constantes y configuración de la aplicación
│   ├── exceptions/         # Manejo de excepciones
│   ├── libs/               # Librerías auxiliares
│   └── server.ts           # Punto de entrada del servidor
├── tests/                  # Pruebas unitarias y de integración
├── .env                    # Variables de entorno
├── .gitattributes          # Configuración de atributos de Git
├── .gitignore              # Ignorar archivos y directorios en Git
├── docker-compose.yml      # Configuración de Docker Compose
├── Dockerfile              # Configuración del contenedor Docker
├── jest.config.ts          # Configuración de Jest
├── package.json            # Dependencias y scripts de NPM
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Documentación del proyecto
```

## Scripts de Construcción y CI

El directorio `bin/` contiene scripts de utilidad para la construcción y pruebas en entornos de integración continua (CI).

### `build.sh`

Compila la aplicación TypeScript y genera los archivos en el directorio `dist/`.

```bash
bin/build.sh
