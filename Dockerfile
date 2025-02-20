# frontend/Dockerfile
FROM node:20 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --verbose || cat /app/npm-debug.log

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry in build
ENV NEXT_TELEMETRY_DISABLED=1

# Define build arguments
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MINIO_URL
ARG NEXT_PUBLIC_MINIO_ACCESS_KEY
ARG NEXT_PUBLIC_MINIO_SECRET_KEY
ARG NEXT_PUBLIC_MINIO_BUCKET
ARG NEXT_PUBLIC_MINIO_REGION
ARG NEXT_PUBLIC_MINIO_S3_ENDPOINT
ARG API_KEY
ARG JWT_SECRET

# Set environment variables for build
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_MINIO_URL=${NEXT_PUBLIC_MINIO_URL}
ENV NEXT_PUBLIC_MINIO_ACCESS_KEY=${NEXT_PUBLIC_MINIO_ACCESS_KEY}
ENV NEXT_PUBLIC_MINIO_SECRET_KEY=${NEXT_PUBLIC_MINIO_SECRET_KEY}
ENV NEXT_PUBLIC_MINIO_BUCKET=${NEXT_PUBLIC_MINIO_BUCKET}
ENV NEXT_PUBLIC_MINIO_REGION=${NEXT_PUBLIC_MINIO_REGION}
ENV NEXT_PUBLIC_MINIO_S3_ENDPOINT=${NEXT_PUBLIC_MINIO_S3_ENDPOINT}
ENV API_KEY=${API_KEY}
ENV JWT_SECRET=${JWT_SECRET}

RUN npm run build

# Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Disable telemetry in runtime
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]