== Install

https://www.meteor.com/
https://www.meteor.com/install

== Run Locally

Running meteor:
Copy example-settings-development.json as settings-development.json
If running with redis-oplog on local development:
- Create a keyFile for mongodb by running `openssl rand -base64 756 > dev/mongo/mongo.key`
- Set permissions on it `chown 999:999 dev/mongo/mongo.key`
- Copy `docker-compose.dev.sample.yml` to `docker-compose.yml`
- Configure mongodb with replication by running `docker compose up mongo mongo-setup` (it should complete and `mongo-setup` should exit), then ctrl+c to stop
- Start the stack with `docker compose up mongo redis oplogToRedis -d`
- You can now run `npm run dev` to start the meteor server with redis-oplog

If not running with redis-oplog on local development:
- Remove `cultofcoders:redis-oplog` and `disable-oplog` from `.meteor/packages`
- Remove the `MONGO_URL=mongodb://admin:admin@127.0.0.1:27017/?replicaSet=dbrs MONGO_OPLOG_URL=mongodb://oplogger:oplogger@127.0.0.1:27017/local?replicaSet=dbrs&authSource=admin` from the `package.json` `dev` script
- Run `npm run dev` to start the meteor server

Running the Battle-Proxy and Battle-Node:
- Copy the `.env.sample` in `server/battle-proxy` and `server/battle-node` to `.env` in both projects
- In each project, run `npm run dev`

Running the Battle-Proxy and Battle-Node in docker:
- Copy `docker-compose.dev.sample.yml` to `docker-compose.yml`
- Run `docker compose up battle-proxy battle-node`

== Deployment

Meteor server:
http://meteor-up.com/
https://github.com/zodern/meteor-up

Install `meteor-up`
Make a .deploy folder
Copy a production settings.json to that folder
Copy a production mup.js to that folder
Run `mup deploy`

Battle server:
SSH into the battle-server with forward-agent enabled for SSH keys
`cd ~/sword-clicker`
`git pull`
Make any necessary changes to the `docker-compose.yml` file if required
`docker compose stop`
`docker compose build`
`docker compose up -d`

Mongo server:
Honestly it's a lot and I should add the notes I took for all three of these servers.
Mongo server needs to be running mongo accessible by Meteor server with single-node replSet and TLS, and redis accessible by Meteor server with TLS, and oplogToMongo project in a docker compose.

== Gotchas

- If you give yourself all items with /debugAllItems the "more" / "less" won't show up and you will only see a few items. This is somehow related to the `itemViewLimit` and how it applies filtering for something like the furnaces, where they "stack" invisibly and you only see the newest furnace. This means it will look like your regular crafting inventory is empty when it is not.

== Growth

/r/PBBG
/r/incremental_games/
/r/webgames
