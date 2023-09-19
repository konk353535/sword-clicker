module.exports = {
    servers: {
        one: {
            host: "<host-ip-address>",
            username: "<host-username>",
            password: "<host-password>",
            privateIp: "<optional-private-host-ip-address>"
        }
    },

    app: {
        name: "sword-clicker",
        path: "../",

        servers: {
            one: {}
        },

        buildOptions: {
            serverOnly: true
        },

        env: {
            redisConfigureKeyspaceNotifications: 1,
            deployCheckWaitTime: 60,
            ROOT_URL: "https://eternitytower.net",
            MONGO_URL: "<mongo_connection_string>"
        },
        deployCheckWaitTime: 60,

        docker: {
            image: "guillim/meteord:node14.18.2",
            prepareBundle: true,
            useBuildKit: true
        },

        // Show progress bar while uploading bundle to server
        // You might need to disable it on CI servers
        enableUploadProgressBar: true
    },

    proxy: {
        // (Required when using swarm) Servers to run the reverse proxy on.
        // When using Let's Encrypt, DNS needs to be setup for these servers.
        servers: {
            one: {}
        },
        // comma-separated list of domains your website
        // will be accessed at.
        // You will need to configure your DNS for each one.
        domains: "eternitytower.net",
        ssl: {
            // Enable let's encrypt to create free certificates.
            // The email is used by Let's Encrypt to notify you when the
            // certificates are close to expiring.
            letsEncryptEmail: "<email>",
            forceSSL: true
        }
    }
}
