FROM node:20-alpine3.17 as base

WORKDIR ./grpc-app
RUN apk add --no-cache curl

FROM base AS grpc
COPY package*.json /grpc-app/
RUN npm ci
COPY . /grpc-app
COPY .env.prod .env
RUN echo "grpc"
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]