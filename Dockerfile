# Stage 1: Build
FROM node:20-alpine AS builder

# Instala o openssl para o Prisma detectar a versão correta durante o generate
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Instala todas as dependências
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retries 5 && \
    npm ci

COPY . .

# Gera o Prisma Client e compila o projeto NestJS
RUN npx prisma generate
RUN npm run build

# Limpa as devDependencies
RUN npm prune --production

# Stage 2: Production
FROM node:20-alpine

# Instala o openssl no container final para o runtime do Prisma Query Engine
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./

# Copia os arquivos compilados e as node_modules prontas
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]