# --- Step 1: Build Stage ---
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy project files
COPY . .

# Build Next.js project
RUN npm run build

# --- Step 2: Production Stage ---
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only the needed files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000
CMD ["npm", "start"]
