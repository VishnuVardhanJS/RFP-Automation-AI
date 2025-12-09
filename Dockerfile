
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

FROM node:20-slim AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend .

FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=backend-builder /app/backend /app/backend
COPY --from=frontend-builder /app/frontend/dist /app/frontend-dist

RUN npm install -g serve

EXPOSE 5000 4173

CMD ["sh", "-c", "node backend/server.js & serve -s frontend-dist -l 4173 && wait"]

