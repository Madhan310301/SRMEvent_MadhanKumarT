# ========================================================
# FairShift — Google Cloud Run Production Containerfile
# United Nations SDG 8: Decent Work and Economic Growth
# PromptWars 2026 | SRM ACM Student Chapter
# ========================================================

# Stage 1: Build production React + Vite application
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency specifications
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

# Install dependencies deterministically
RUN pnpm install --frozen-lockfile

# Copy application source and configuration
COPY . .

# Build production bundle with TypeScript verification
RUN pnpm run build

# ========================================================
# Stage 2: Production Nginx Server (Ultra-lightweight Alpine)
# ========================================================
FROM nginx:1.27-alpine AS runner

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy built distribution files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with SPA routing and Cloud Run port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Google Cloud Run standard ingress port
EXPOSE 8080

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
