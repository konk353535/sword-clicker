FROM node:18-bookworm-slim as base

ARG PORT=443
EXPOSE ${PORT}
EXPOSE 80

WORKDIR /builder
COPY . .
RUN cd ./server/battle-proxy && npm install && npm run build

FROM base as production

WORKDIR /app

COPY --from=base ./builder/server/battle-proxy/build ./build
COPY server/battle-proxy/package*.json ./
RUN npm install --production

CMD [ "npm", "run", "prod" ]