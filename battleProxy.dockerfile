FROM node:18-bookworm-slim as base

ARG HTTP_PORT=3057
# HTTPS_PORT does nothing in dev mode
ARG HTTPS_PORT=443

EXPOSE ${HTTP_PORT}
EXPOSE ${HTTPS_PORT}

WORKDIR /builder
COPY . .
RUN cd ./server/battle-proxy && npm install && npm run build

FROM base as production

WORKDIR /app

COPY --from=base ./builder/server/battle-proxy/build ./build
COPY server/battle-proxy/package*.json ./
RUN npm install --production

CMD [ "npm", "run", "prod" ]