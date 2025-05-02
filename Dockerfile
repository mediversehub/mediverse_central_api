# ---------- STAGE 1: Build ----------
FROM node:23-slim AS builder

# Set working directory
WORKDIR /app
    
# Install dependencies
COPY package*.json ./
RUN npm ci
    
# Copy source files
COPY . .
    
# Build the TypeScript project
RUN npm run build

# ---------- STAGE 2: Production ----------
FROM node:23-slim

# Set working directory
WORKDIR /app

# Only copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the app port (default fallback)
EXPOSE 3000

# Define environment variables (can be overridden)
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/server.js"]
