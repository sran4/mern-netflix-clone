#!/bin/sh

echo "Starting Netflix Clone..."

# Set environment variables
export NODE_ENV=production
export PORT=${PORT:-10000}

echo "Environment: $NODE_ENV"
echo "Port: $PORT"

# Start the server
exec npm start
