#!/bin/bash

ENV_FILE="../.env"

if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
else
    SMOKE_GRAPHQL_ENDPOINT="$SMOKE_GRAPHQL_ENDPOINT"
fi

APPLICATION_HEALTH=$(curl -X POST -H "Content-Type: application/json" -d '{"query": "query {resourceHealthCheck}"}' ${SMOKE_GRAPHQL_ENDPOINT} | jq -r '.data.resourceHealthCheck')
DATABASE_HEALTH=$(curl -X POST -H "Content-Type: application/json" -d '{"query": "query {resourceDBCheck}"}' ${SMOKE_GRAPHQL_ENDPOINT} | jq -r '.data.resourceDBCheck')

if [[ "$APPLICATION_HEALTH" == "OK" && "$DATABASE_HEALTH" == "OK" ]]; then
    echo "Health checks passed:"
    echo "Application Health: $APPLICATION_HEALTH"
    echo "Database Health: $DATABASE_HEALTH"
else
    echo "Health checks failed:"
    echo "Application Health: $APPLICATION_HEALTH"
    echo "Database Health: $DATABASE_HEALTH"
    exit 1
fi
