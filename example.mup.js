module.exports = {
  servers: {
    one: {
      host: '',
      username: '',
      pem: ''
    },
    two: {
      host: '',
      username: '',
      pem: ''
    },
    three: {
      host: '',
      username: '',
      pem: ''
    },
    four: {
      host: '',
      username: '',
      pem: ''
    }
  },
  meteor: {
    name: 'EternityTower',
    path: '~/path-to-project',
    servers: {
      one: {},
      two: {},
      three: {},
      four: {}
    },
    docker: {
      image: 'abernix/meteord:base',
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: '',
      CLUSTER_WORKERS_COUNT: 1,
      MAIL_URL: "",
      "MONGO_URL": "",
      "MONGO_OPLOG_URL": "",
      "redisConfigureKeyspaceNotifications": 1,
      "redisUrl": ""
    },
    deployCheckWaitTime: 60
  }
};