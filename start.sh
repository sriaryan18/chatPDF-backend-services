#!/bin/bash

# Start Docker services
docker-compose up -d

# Check if docker-compose was successful
if [ $? -eq 0 ]; then
  echo "Docker services started successfully."

  # Start nodeGateway in a new detached screen session named 'nodeGateway'
  screen -dmS nodeGateway bash -c 'cd nodeGateway && pnpm dev'

  # Start documentService in a new detached screen session named 'documentService'
  screen -dmS documentService bash -c 'cd documentService && tsc -b && pnpm dev'

  # Start documentProcessor in a new detached screen session named 'documentProcessor'
  screen -dmS documentProcessor bash -c 'cd documentProcessor && pnpm dev'
else
  echo "Failed to start Docker services."
  exit 1
fi

