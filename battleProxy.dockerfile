FROM node:14-bullseye-slim as base

ENV app server/battle-proxy

RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app


FROM base AS builder-server
WORKDIR /home/node/app
COPY --chown=node:node ./${app}/package.json ./${app}/package.json
COPY --chown=node:node ./${app}/package-lock.json ./${app}/package-lock.json
USER node
RUN cd ./${app} && npm install --loglevel warn --omit=dev


FROM base AS production
WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
COPY --chown=node:node --from=builder-server /home/node/app/${app}/node_modules ./${app}/node_modules

ARG HTTP_PORT=3057
# HTTPS_PORT does nothing in dev mode
ARG HTTPS_PORT=443

EXPOSE ${HTTP_PORT}
EXPOSE ${HTTPS_PORT}

WORKDIR /home/node/app/${app}
