#!/bin/bash

echo "Starting build process..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install frontend dependencies (including dev dependencies)
echo "Installing frontend dependencies..."
cd frontend
npm install --include=dev

# Verify vite is available
echo "Checking if vite is available..."
npx vite --version

# Build the frontend
echo "Building frontend..."
npm run build

# Return to root
cd ..

echo "Build completed successfully!"