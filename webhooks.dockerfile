FROM node:18-bookworm-slim as base

ENV app server/webhooks

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

ARG PORT=8443

EXPOSE ${PORT}

WORKDIR /home/node/app/${app}
