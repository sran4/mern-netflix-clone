#!/bin/bash

# Install root dependencies
npm install

# Navigate to frontend and install dependencies
cd frontend
npm install

# Build the frontend
npm run build

# Return to root
cd ..
