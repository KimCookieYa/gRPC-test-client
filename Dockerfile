FROM node:18-alpine as base

WORKDIR ./grpc-app
RUN apk add --no-cache curl

FROM base AS grpc
COPY package*.json /grpc-app/
RUN npm ci
COPY . /grpc-app
COPY .env.local env.local
RUN echo "grpc"
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]