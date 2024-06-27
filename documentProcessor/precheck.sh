#!/bin/bash

KAFKA_HOST=${KAFKA_HOST:-localhost}
KAFKA_PORT=${KAFKA_PORT:-9092}

echo "Checking if Kafka is up at $KAFKA_HOST:$KAFKA_PORT..."

while ! kcat -L -b $KAFKA_HOST:$KAFKA_PORT > /dev/null 2>&1; do
  echo "Kafka is not available. Retrying in 5 seconds..."
  sleep 5
done

echo "Kafka is up. Starting the service..."
