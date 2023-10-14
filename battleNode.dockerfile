FROM node:18-bookworm-slim as base

ENV app server/battle-node

RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app


FROM base AS builder-server
WORKDIR /home/node/app

# this pair is for meteor dependencies since the battle-node calls up to it
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json

# this pair is for battle-node dependencies
COPY --chown=node:node ./${app}/package.json ./${app}/package.json
COPY --chown=node:node ./${app}/package-lock.json ./${app}/package-lock.json
USER node
RUN npm install --loglevel warn --omit=dev && cd ./${app} && npm install --loglevel warn --omit=dev


FROM base AS production
WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
COPY --chown=node:node --from=builder-server /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder-server /home/node/app/${app}/node_modules ./${app}/node_modules

ARG HTTP_PORT=3055
EXPOSE ${HTTP_PORT}

WORKDIR /home/node/app/${app}
