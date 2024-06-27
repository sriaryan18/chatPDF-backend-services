#!/bin/bash

# Stop the screen sessions
screen -S nodeGateway -X quit
screen -S documentService -X quit
screen -S documentProcessor -X quit

# Stop the Docker containers
docker-compose down

