FROM node:18-bookworm-slim as base

ARG PORT=3055
EXPOSE ${PORT}

WORKDIR /builder
COPY . .
RUN cd ./server/battle-node && npm install && npm run build

FROM base as production

WORKDIR /app

COPY --from=base ./builder/server/battle-node/build ./build
COPY server/battle-node/package*.json ./
RUN npm install --production

CMD [ "npm", "run", "prod" ]