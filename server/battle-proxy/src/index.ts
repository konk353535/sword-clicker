// import "./tracing"

import ConsistentHashing from "consistent-hashing"
import express from "express"
import basicAuth from "express-basic-auth"
import http from "http"
import { createProxyMiddleware } from "http-proxy-middleware"
import https from "https"
import fs from "node:fs"
import client from "prom-client"
import queryString from "query-string"
import { z } from "zod"
import { env, validateEnv } from "./validateEnv"

validateEnv()

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: "proxy-node"
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

const displayBlockedConnections = true
const consistentHash = new ConsistentHashing(env.SERVERS)

const queryDataSchema = z.object({
    balancer: z.string().optional(),
    userId: z.string(),
    userName: z.string(),
    conSeed: z.string().optional()
})

// Utility for determining if an object exists and is set
function validObject(data: any) {
    try {
        if (data && data !== undefined && data !== null) {
            return true
        }
    } catch (err) {}
    return false
}

// Utility for determining if an object exists and is set with data that can be described as non-empty text
function validData(data: any) {
    try {
        if (validObject(data)) {
            let sData = data.toString()

            if (sData.length > 0 && sData !== "undefined" && sData !== "unknown") {
                return true
            }
        }
    } catch (err) {}
    return false
}

// Utility for disconnecting a Socket
function dropWebsocketConnection(oSocket: any) {
    try {
        if (validObject(oSocket) && validObject(oSocket._handle)) {
            if (validObject(oSocket.destroy)) {
                oSocket.destroy()
            } else if (validObject(oSocket.close)) {
                oSocket.close()
            }
        }
    } catch (err) {}
    return
}

// Utility for disconnecting a web request
function dropHttpConnection(oResponse: any, iStatus = 403, sStatusReason = "Unauthorized") {
    try {
        oResponse.writeHead(iStatus, { "Content-Type": "text/plain" })
        oResponse.write(sStatusReason)
        oResponse.end()
    } catch (err) {}
    return
}

type ConnectionValues = {
    queryData: z.infer<typeof queryDataSchema> | null
    targetServerUrl: string
    denyConnection: boolean
    connectionText: string
    wantLog: boolean
}

// Utility for getting operational values (shared between both httpServer and httpProxyServer)
function getConnectionValues(req: http.IncomingMessage): ConnectionValues {
    const url = req.url?.split("?")[1]
    if (url == null) {
        throw new Error(`Unknown url: ${req.url}`)
    }

    const queryData = queryDataSchema.safeParse(queryString.parse(url))

    if (queryData.success) {
        const targetServerUrl =
            queryData.data.balancer !== null ? (consistentHash.getNode(queryData.data.balancer) as string) : ""
        if (targetServerUrl == null) {
            // bad server?
            return {
                queryData: queryData.data,
                targetServerUrl: "",
                denyConnection: true,
                connectionText: "BLOCKED: invalid targetServerUrl",
                wantLog: displayBlockedConnections
            }
        }

        return {
            queryData: queryData.data,
            targetServerUrl: targetServerUrl,
            denyConnection: false,
            connectionText: `ACCEPTED ${queryData.data.userName} (#${queryData.data.userId})` + " :: ",
            wantLog: displayBlockedConnections
        }
    }

    return {
        queryData: null,
        targetServerUrl: "",
        denyConnection: true,
        connectionText: `BLOCKED: ${queryData.error}\n`,
        wantLog: displayBlockedConnections
    }
}

// function getUniqueId(req: http.IncomingMessage) {
//     const url = req.url?.split("?")[1]
//     if (url == null) {
//         throw new Error(`Unknown url: ${req.url}`)
//     }
//     const queryData = queryString.parse(url)

//     return `${queryData.userId}#${queryData.conSeed}`
// }

// Utility for getting some IP information and optional logging to screen
function getIPandLog(req: http.IncomingMessage, wantLog: boolean, connectionText: string) {
    let ipAddr: string | string[] = "unknown"
    let ipAddrText = ipAddr

    try {
        if (req.socket.remoteAddress == null) {
            throw new Error("Unknown remote address")
        }

        ipAddr = req.socket.remoteAddress

        let proxiedAddr = req.headers["x-forwarded-for"]
        if (proxiedAddr === undefined || proxiedAddr.length === 0) {
            proxiedAddr = req.headers["cf-connecting-ip"]
        }
        if (proxiedAddr === undefined || proxiedAddr.length === 0) {
            proxiedAddr = "unknown"
        }
        if (validData(proxiedAddr)) {
            ipAddrText = `${proxiedAddr} via ${ipAddr}`
            ipAddr = proxiedAddr
        } else {
            ipAddrText = ipAddr
        }

        if (wantLog) {
            let cloudflareRay = req.headers["cf-ray"] ? req.headers["cf-ray"] : "unknown"
            let cloudflareCountry = req.headers["cf-ipcountry"] ? req.headers["cf-ipcountry"] : "unknown"

            if (cloudflareRay === "unknown") {
                console.log(`    ${connectionText}${ipAddrText}`)
            } else {
                console.log(`    ${connectionText}${ipAddrText} routed @ ${cloudflareCountry}@${cloudflareRay}`)
            }
        }
    } catch (err) {
        if (wantLog) {
            console.log(`    ${connectionText}${ipAddrText}`)
        }
    }

    return ipAddr
}

const server = express()

const securedRoutes = express.Router()
securedRoutes.use(
    basicAuth({
        users: { [env.METRIC_BASIC_AUTH_USER]: env.METRIC_BASIC_AUTH_PASS },
        challenge: true
    })
)

server.use("/metrics", securedRoutes)

server.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", register.contentType)
    res.end(await register.metrics())
})

server.use((req, res, next) => {
    // see if we need to deny connection
    const { connectionText, denyConnection, wantLog } = getConnectionValues(req)
    getIPandLog(req, wantLog, connectionText)
    if (denyConnection) {
        if (wantLog) {
            console.log(connectionText)
        }
        return res.status(401).send(connectionText)
    }

    return next()
})

// const connectionMap = new Map<string, { web?: Response; sock?: Socket }>()

const proxyMiddleware = createProxyMiddleware({
    ws: true, // proxy websockets
    router: (req) => {
        const { targetServerUrl } = getConnectionValues(req)

        return targetServerUrl.replace("https", "http")
    },
    logLevel: "debug",
    proxyTimeout: 1000 * 30,
    timeout: 1000 * 30,
    onProxyReq: (proxyReq, req, res) => {
        const { queryData, targetServerUrl, connectionText, wantLog } = getConnectionValues(req)
        const ipAddr = getIPandLog(req, false, connectionText)
        // Note: slip the non-proxied original IP address of the player into the request
        // URL so the battle node understands what IPs belong to which user.
        req.url = `${req.url}&ipAddr=${ipAddr}`
        if (wantLog) {
            console.log(`Balancer - ${queryData?.balancer} | Proxying HTTP (${req.url}) to ${targetServerUrl}`)
        }

        // do we already have a connection for this ID?
        // const id = getUniqueId(req)

        // console.log("id", id, "keys", connectionMap.keys())
        // const conn = connectionMap.get(id)
        // if (conn != null) {
        //     // close previous
        //     dropWebsocketConnection(conn.sock)
        //     dropHttpConnection(conn.web)
        //     connectionMap.set(id, { web: res })
        // } else {
        //     connectionMap.set(id, { web: res })
        // }
    },
    onProxyReqWs: (proxyReq, req, res) => {
        const { queryData, targetServerUrl, connectionText, wantLog } = getConnectionValues(req)
        const ipAddr = getIPandLog(req, false, connectionText)
        // Note: slip the non-proxied original IP address of the player into the request
        // URL so the battle node understands what IPs belong to which user.
        req.url = `${req.url}&ipAddr=${ipAddr}`
        if (wantLog) {
            console.log(`Balancer - ${queryData?.balancer} | Proxying WebSocket (${req.url}) to ${targetServerUrl}`)
        }

        // const id = getUniqueId(req)
        // connectionMap.set(id, { sock: res })
    },
    onError: (err, req, res, target) => {
        console.log(`Proxy error: ${err}:`)
        dropHttpConnection(res, 500, "Unknown error occurred.")
        // const id = getUniqueId(req)
        // connectionMap.delete(id)
    },
    onClose: (res, socket, head) => {
        // view disconnected websocket connections
        dropHttpConnection(res, 500, "Unknown error occurred.")
        dropWebsocketConnection(socket)
        // connectionMap.delete(id)
    }
})

server.use(proxyMiddleware)

let proxyServer: ReturnType<typeof https.createServer> | ReturnType<typeof http.createServer>

if (env.NODE_ENV === "production") {
    const options = {
        key: fs.readFileSync("/ssl/privkey1.pem"),
        cert: fs.readFileSync("/ssl/cert1.pem")
    }

    proxyServer = https.createServer(options, server)

    // also set up a server to listen on port 80 and redirect to 443
    http.createServer(function (req, res) {
        res.setHeader("location", "https://battle.eternitytower.net")
        res.statusCode = 302
        res.end()
    }).listen(80)
} else {
    proxyServer = http.createServer(server)
}

// `httpServer` inherits `net` emitted events
// https://nodejs.org/api/net.html#net_event_timeout
proxyServer.on("timeout", function (socket) {
    // Emitted if the socket times out from inactivity. This is only to notify that the
    // socket has been idle. The user must manually close the connection.

    // Note: can occur from timeout attempting to connect to battle-node or just the
    // client timing out.

    dropWebsocketConnection(socket)
})

// `httpServer` inherits `net` emitted events
// https://nodejs.org/api/net.html#net_event_error_1
proxyServer.on("error", function (err) {
    // Emitted when an error occurs. The 'close' event will be called directly following this event.

    console.log("Proxy server error emitted:")
    console.log(err)

    // Note: since the socket is automatically closed, no further logic here.
})

// `httpServer` event
// https://nodejs.org/api/http.html#http_event_clienterror
proxyServer.on("clientError", function (err, socket) {
    // If a client connection emits an 'error' event, it will be forwarded here.  Listener of this
    // event is responsible for closing/destroying the underlying socket.
    console.log("Proxy server clientError emitted:")
    console.log(err)

    dropWebsocketConnection(socket)
})

// Begin listening for basic web requests to upgrade to webSockets
if (env.NODE_ENV === "production") {
    proxyServer.listen(env.HTTPS_PORT, "0.0.0.0")
} else {
    proxyServer.listen(env.HTTP_PORT, "0.0.0.0")
}
