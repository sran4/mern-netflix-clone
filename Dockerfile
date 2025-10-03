# Use Node.js 18
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN cd frontend && npm install

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Expose port (Railway uses PORT environment variable)
EXPOSE 10000

# Set environment
ENV NODE_ENV=production
ENV PORT=10000

# Start the application
CMD ["npm", "start"]