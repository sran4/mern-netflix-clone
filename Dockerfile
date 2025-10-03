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
RUN echo "Building frontend..." && \
    cd frontend && \
    npm run build && \
    echo "Frontend build completed" && \
    ls -la dist/ && \
    echo "Checking if index.html exists..." && \
    ls -la dist/index.html

# Verify build output
RUN echo "Verifying build output..." && \
    ls -la /app/frontend/dist/ && \
    test -f /app/frontend/dist/index.html && \
    echo "✅ index.html found"

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