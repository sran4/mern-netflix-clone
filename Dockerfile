# Use Node.js 18
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN cd frontend && npm install

# Copy source code
COPY . .

# Build frontend with verbose output
RUN echo "=== Building frontend ===" && \
    cd frontend && \
    echo "Current directory: $(pwd)" && \
    echo "Files in frontend directory:" && \
    ls -la && \
    echo "Running npm run build..." && \
    npm run build && \
    echo "=== Frontend build completed ===" && \
    echo "Files in dist directory:" && \
    ls -la dist/ && \
    echo "Checking if index.html exists..." && \
    test -f dist/index.html && echo "✅ index.html found" || echo "❌ index.html not found"

# Verify build output from app root
RUN echo "=== Verifying build from app root ===" && \
    echo "Current directory: $(pwd)" && \
    echo "Files in app directory:" && \
    ls -la && \
    echo "Checking frontend/dist..." && \
    ls -la frontend/dist/ && \
    echo "Checking if index.html exists at /app/frontend/dist/index.html..." && \
    test -f frontend/dist/index.html && echo "✅ index.html found at /app/frontend/dist/index.html" || echo "❌ index.html not found"

# Expose port
EXPOSE 10000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Start the application
CMD ["npm", "start"]