# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only dependency manifests first (better layer caching)
COPY package.json package-lock.json ./

# Install all dependencies (use --legacy-peer-deps to avoid peer conflict errors)
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Set the API URL for the production build – nginx will proxy /api → backend
ENV VITE_API_URL=/api

# Build the Vite app
RUN npm run build

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:stable-alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy the built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom nginx config (handles /api proxy + SPA routing)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
