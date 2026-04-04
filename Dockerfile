# Étape de base pour installer les dépendances
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Étape build pour production
FROM base AS builder
COPY . .
# Build Next.js
RUN npm run build

# Étape production
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
