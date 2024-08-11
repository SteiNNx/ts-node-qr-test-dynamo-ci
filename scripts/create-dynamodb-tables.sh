#!/bin/bash
# suit-Node-local.sh
# Autor: Jorge Reyes

# Incluir funciones de utilidad
source scripts/command/main.sh

# Crear tabla DynamoDB usando variables de entorno
create_dynamo_table() {
    aws dynamodb create-table \
        --table-name "${DYNAMO_TABLE_NAME}" \
        --attribute-definitions AttributeName=id,AttributeType=S \
        --key-schema AttributeName=id,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
        --tags Key=Environment,Value="${DYNAMODB_DATABASE_ENVIRONMENT}" \
        --endpoint-url "${DYNAMODB_DATABASE_ENDPOINT}"

    if [ $? -eq 0 ]; then
        success "Tabla DynamoDB '${DYNAMO_TABLE_NAME}' creada exitosamente."
    else
        critical_error "Error al crear la tabla DynamoDB. Por favor, verifica el comando de AWS CLI y la configuración del entorno."
    fi
}

# Función principal
main() {
    validate_environment
    source_env_vars ".env"
    create_dynamo_table
}

# Ejecutar función principal
main "$@"
