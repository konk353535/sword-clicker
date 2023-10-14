FROM node:14-bullseye-slim as base

ENV app server/battle-proxy

RUN mkdir -p /home/node/app
WORKDIR /home/node/app


FROM base AS builder-server
WORKDIR /home/node/app
COPY ./${app}/package.json ./${app}/package.json
COPY ./${app}/package-lock.json ./${app}/package-lock.json
RUN cd ./${app} && npm install --loglevel warn --omit=dev


FROM base AS production
WORKDIR /home/node/app
COPY . .
COPY --from=builder-server /home/node/app/${app}/node_modules ./${app}/node_modules

ARG HTTP_PORT=3057
# HTTPS_PORT does nothing in dev mode
ARG HTTPS_PORT=443

EXPOSE ${HTTP_PORT}
EXPOSE ${HTTPS_PORT}

WORKDIR /home/node/app/${app}
