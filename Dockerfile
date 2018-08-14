FROM mhart/alpine-node:8.9

WORKDIR /usr/src/service
COPY src src
COPY schema schema
COPY data data
COPY .babelrc .babelrc
COPY package*.json ./
COPY build/.npmrc .npmrc
RUN npm install && \
  npm run build && \
  rm .npmrc && \
  rm -rf src

ENV NODE_ENV production
ENV SCHEMA_LOCATION .
ENV DATA_LOCATION data
