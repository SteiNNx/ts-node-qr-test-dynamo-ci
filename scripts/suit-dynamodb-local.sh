#!/bin/bash
# suit-dynamodb-local.sh
# Autor: Jorge Reyes

# Incluir funciones de utilidad
source scripts/command/main.sh

# Inicializar los contenedores de DynamoDB
init_dynamo_suite_containers() {
    init_docker_containers \
        "${SUITE_PROJECT_DYNAMODB}" \
        "./scripts/docker/docker-compose-dynamodb-server.yml" \
        "$1" \
        "DynamoDB Iniciado." \
        "No se pudo iniciar DynamoDB. Verifica el archivo docker-compose."
}

# Función principal
main() {
    validate_environment
    source_env_vars ".env"
    init_dynamo_suite_containers "$1"
}

# Ejecutar función principal
main "$@"
