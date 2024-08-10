#!/bin/bash
# suit-Node-local.sh
# Autor: Jorge Reyes

# Incluir funciones de utilidad
source scripts/command/main.sh

# Inicializar los contenedores de Node
init_node_suite_containers() {
    init_docker_containers \
        "${SUITE_PROJECT_QR_APP_NODE}" \
        "./scripts/docker/docker-compose-node-server.yml" \
        "$1" \
        "Node Iniciado." \
        "No se pudo iniciar Node. Verifica el archivo docker-compose."
}

# Función principal
main() {
    validate_environment
    source_env_vars ".env"
    init_node_suite_containers "$1"
}

# Ejecutar función principal
main "$@"