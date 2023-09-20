#!/bin/bash

m1=mongo
port=${PORT:-27017}

echo "###### Waiting for ${m1} instance startup.."
until mongosh --host ${m1}:${port} --eval 'quit(db.runCommand({ ping: 1 }).ok ? 0 : 2)' &>/dev/null; do
  printf '.'
  sleep 1
done
echo "###### Working ${m1} instance found, initiating user setup & initializing rs setup.."

# setup user + pass and initialize replica sets
mongosh --host ${m1}:${port} <<EOF
var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
var oplogUser = '$MONGO_OPLOG_USERNAME';
var oplogPassword = '$MONGO_OPLOG_PASSWORD';
var admin = db.getSiblingDB('admin');
admin.auth(rootUser, rootPassword);

var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "${m1}:${port}",
            "priority": 2
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();

admin.createUser({user: rootUser, pwd: rootPassword, roles: [{ role: "userAdminAnyDatabase", db: "admin" },{ role: "readWriteAnyDatabase", db: "admin" }] });
admin.createUser({user: oplogUser, pwd: oplogPassword, roles: [{ role: "read", db: "local" }] });

EOF