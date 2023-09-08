docker exec resource-management-service prisma migrate deploy

# Load .env file if it exists
ENV_FILE="../.env"
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
fi

# Check to make sure environment is Staging then run smoke test
if [[ ${ENVIRONMENT} == "staging" ]]; then
  chmod +x ./smoke.sh
  ./smoke.sh
fi
