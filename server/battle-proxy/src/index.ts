import ConsistentHashing from "consistent-hashing"
import http from "http"
import httpProxy from "http-proxy"
import https from "https"
import fs from "node:fs"
import type internal from "node:stream"
import queryString from "query-string"
import { z } from "zod"
import { PORT, SERVERS } from "./config"

const displayBlockedConnections = true
const consistentHash = new ConsistentHashing(Object.keys(SERVERS))

const queryDataSchema = z.object({
    balancer: z.string().optional(),
    userId: z.string(),
    userName: z.string()
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

type ConnectionValues = {
    queryData: z.infer<typeof queryDataSchema> | null
    targetServerId: number
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
        const targetServerId =
            queryData.data.balancer !== null ? (consistentHash.getNode(queryData.data.balancer) as number) : 1
        const targetServerUrl = SERVERS[targetServerId]
        if (targetServerUrl == null) {
            // bad server?
            return {
                queryData: queryData.data,
                targetServerId: -1,
                targetServerUrl: "",
                denyConnection: true,
                connectionText: "BLOCKED: invalid targetServerUrl",
                wantLog: displayBlockedConnections
            }
        }

        return {
            queryData: queryData.data,
            targetServerId: targetServerId,
            targetServerUrl: targetServerUrl,
            denyConnection: false,
            connectionText: `ACCEPTED ${queryData.data.userName} (#${queryData.data.userId})` + " :: ",
            wantLog: displayBlockedConnections
        }
    }

    return {
        queryData: null,
        targetServerId: -1,
        targetServerUrl: "",
        denyConnection: true,
        connectionText: `BLOCKED: ${queryData.error}`,
        wantLog: displayBlockedConnections
    }
}

const upgradeSchema = z.object({
    userName: z.string().optional(),
    userId: z.string(),
    conSeed: z.string()
})

function getUniqueId(req: http.IncomingMessage) {
    const url = req.url?.split("?")[1]
    if (url == null) {
        throw new Error(`Unknown url: ${req.url}`)
    }

    const queryData = upgradeSchema.safeParse(queryString.parse(url))

    if (queryData.success) {
        return `${queryData.data.userId}#${queryData.data.conSeed}`
    } else {
        // throw queryData.error
        return ""
    }
}

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

// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({
    ws: true
})

// Utility for disconnecting a web request
function dropHttpConnection(
    oResponse: http.ServerResponse<http.IncomingMessage>,
    iStatus = 403,
    sStatusReason = "Unauthorized"
) {
    try {
        oResponse.writeHead(iStatus, { "Content-Type": "text/plain" })
        oResponse.write(sStatusReason)
        oResponse.end()
    } catch (err) {}
    return
}

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

const respFn = function (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage }
) {
    try {
        const { queryData, targetServerId, targetServerUrl, denyConnection, connectionText, wantLog } =
            getConnectionValues(req)

        if (wantLog) {
            console.log(`Balancer - ${queryData?.balancer} | Proxying HTTP to ${targetServerId}`)
        }

        const ipAddr = getIPandLog(req, wantLog, connectionText)

        if (!denyConnection) {
            // Note: slip the non-proxied original IP address of the player into the request
            // URL so the battle node understands what IPs belong to which user.
            req.url = `${req.url}&ipAddr=${ipAddr}`

            proxy.web(req, res, { target: targetServerUrl })
            return
        }
    } catch (err) {
        console.log(err)
    }

    dropHttpConnection(res)
    return false
}

let proxyServer: ReturnType<typeof https.createServer> | ReturnType<typeof http.createServer>

if (process.env.NODE_ENV === "production") {
    const options = {
        key: fs.readFileSync("/ssl/privkey1.pem"),
        cert: fs.readFileSync("/ssl/cert1.pem")
    }

    proxyServer = https.createServer(options, respFn)

    // also set up a server to listen on port 80 and redirect to 443
    http.createServer(function (req, res) {
        res.setHeader("location", "https://battle.eternitytower.net")
        res.statusCode = 302
        res.end()
    }).listen(80)
} else {
    proxyServer = http.createServer(respFn)
}

// Utility for disconnecting a Socket
function dropWebsocketConnection(oSocket: internal.Duplex) {
    try {
        oSocket.destroy()
    } catch (err) {
        console.log("error in dropWebsocketConnection", err)
    }
    return
}

var allConnections: { req: http.IncomingMessage; socket: internal.Duplex }[] = []

// Listen for the web request event to upgrade a socket to a webSocket
proxyServer.on("upgrade", function (req, socket, head) {
    try {
        const { queryData, targetServerId, targetServerUrl, denyConnection, connectionText, wantLog } =
            getConnectionValues(req)

        if (wantLog) {
            console.log(`Balancer - ${queryData?.balancer} | Proxying WebS to ${targetServerId}`)
        }

        const ipAddr = getIPandLog(req, wantLog, connectionText)

        if (!denyConnection) {
            // Note: slip the non-proxied original IP address of the player into the request
            // URL so the battle node understands what IPs belong to which user.
            req.url = `${req.url}&ipAddr=${ipAddr}`

            proxy.ws(req, socket, head, {
                target: targetServerUrl.replace("https", "http")
            })

            const thisId = getUniqueId(req)

            for (let i = 0; i < allConnections.length; i++) {
                if (i < allConnections.length) {
                    const connection = allConnections[i]
                    if (connection != null) {
                        if (getUniqueId(connection.req) === thisId) {
                            if (validObject(connection.socket)) {
                                dropWebsocketConnection(connection.socket)
                            }
                            if (validObject(connection.req) && validObject(connection.req.socket)) {
                                dropWebsocketConnection(connection.req.socket)
                            }
                            allConnections.splice(i, 1)
                            i--
                        }
                    }
                }
            }

            allConnections.push({ req, socket })

            //todo: remove connection when closed
            return
        }
    } catch (err) {
        console.log(err)
    }

    dropWebsocketConnection(socket)
    return false
})

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

// `httpProxy` event
// https://github.com/nodejitsu/node-http-proxy
proxy.on("error", function (err, req, res) {
    // The error event is emitted if the request to the target fail.  We do not do any error handling
    // of messages passed between client and proxy, and messages passed between proxy and target,
    // so it is recommended that you listen on errors and handle them.

    try {
        // @ts-expect-error
        if (err.code === "ECONNREFUSED") {
            // this means battle-node is offline
            dropHttpConnection(res as http.ServerResponse<http.IncomingMessage>, 502, "Combat server is offline.")
        } else {
            // unhandled, so log it
            console.log(err)
            // @ts-expect-error
            console.log(`Unknown proxy error code: ${err.code}:`)

            dropHttpConnection(res as http.ServerResponse<http.IncomingMessage>, 500, "Unknown error occurred.")
        }
    } catch (e) {
        console.log(`Unknown error code: ${err}:`)
        dropHttpConnection(res as http.ServerResponse<http.IncomingMessage>, 500, "Unknown error occurred.")
    }
})

// Begin listening for basic web requests to upgrade to webSockets
proxyServer.listen(PORT)
