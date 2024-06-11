FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM node:18-alpine
WORKDIR /dist
COPY --from=builder ./app/dist/ ./
COPY --from=builder ./app/package*.json ./
RUN npm install
EXPOSE 3003:3003
EXPOSE 3001:3001
CMD ["node", "main.js"]