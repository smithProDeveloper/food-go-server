# =========================
# Etapa 1: Build
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias necesarias para compilar
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build


# =========================
# Etapa 2: Producción
# =========================
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar aplicación compilada
COPY --from=builder /app/build ./build

# Puerto informativo
EXPOSE 4003

# Ejecutar aplicación
CMD ["node", "build/index.js"]