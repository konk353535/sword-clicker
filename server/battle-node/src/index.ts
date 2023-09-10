import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import { Server as AppServer } from "http"
import internal from "node:stream"
import { Server, Socket } from "socket.io"
import { isDev, port, serverUrl } from "./config"
import Battle, { Balancer, balancers } from "./core"

const isSioSocket = (value: any): value is Socket => {
    return value != null && value.hasOwnProperty("client") && value.client != null
}

// Utility for disconnecting a Socket
function dropWebsocketConnection(oSocket: internal.Duplex | Socket) {
    try {
        if (isSioSocket(oSocket)) {
            oSocket.disconnect(true)
        } else {
            oSocket.destroy()
        }
    } catch (err) {
        console.log("error in dropWebsocketConnection", err)
    }
    return
}

const app = express()

var server = new AppServer(app)
var io = new Server(server, {
    serveClient: false // https://socket.io/docs/v4/server-options/#serveclient
})

const battles: { [k in string]: Battle } = {}
let corsOptions = {
    origin: serverUrl,
    credentials: true
}

if (isDev) {
    corsOptions = {
        origin: serverUrl,
        credentials: true
    }
}

app.use(cors(corsOptions))

let allConnections: Socket[] = []

function getUniqueId(socket: Socket) {
    try {
        return `${socket.handshake.query.userId}#${socket.handshake.query.conSeed}`
    } catch (err) {}
    return "?"
}

io.on("error", (x, y, z) => {
    console.log("x")
    console.log(x)
    console.log("y")
    console.log(y)
    console.log("z")
    console.log(z)
})

function getInfoFromSocket(socket: Socket) {
    let userName = "unknown"
    try {
        if (socket.handshake.query.userName != null) {
            const uName = socket.handshake.query.userName
            if (Array.isArray(uName)) {
                if (uName[0] != null) {
                    userName = uName[0]
                }
            } else {
                userName = uName
            }
        }
    } catch (err) {}

    let userId = "unknown"
    try {
        if (socket.handshake.query.userId != null) {
            const uId = socket.handshake.query.userId
            if (Array.isArray(uId)) {
                if (uId[0] != null) {
                    userId = uId[0]
                }
            } else {
                userId = uId
            }
        }
    } catch (err) {}

    let ipAddr = "unknown"
    try {
        // trust the remote connection (our balancer/proxy) to report the correct (and probably forwarded from Cloudflare) IP
        if (socket.handshake.query.ipAddr != null) {
            const ipA = socket.handshake.query.ipAddr
            if (Array.isArray(ipA)) {
                if (ipA[0] != null) {
                    ipAddr = ipA[0]
                }
            } else {
                ipAddr = ipA
            }
        }
    } catch (err) {}
    if (!ipAddr || ipAddr === "" || ipAddr === "undefined" || ipAddr === "unknown") {
        ipAddr = socket.conn.remoteAddress // use Cloudflare's or whatever other raw IP we have as a backup
    }

    return { userName, userId, ipAddr }
}

io.on("connection", (socket) => {
    let { userName, userId, ipAddr } = getInfoFromSocket(socket)

    socket.on("disconnect", function () {
        var idx = allConnections.indexOf(socket)
        if (idx !== -1) {
            allConnections.splice(idx, 1)

            let { userName, userId, ipAddr } = getInfoFromSocket(socket)

            console.log(
                `<--  disconnected from ${ipAddr} (${userName}/${userId}), connections = ${allConnections.length}`
            )
        }
    })

    try {
        const thisId = getUniqueId(socket)

        for (let i = 0; i < allConnections.length; i++) {
            if (i < allConnections.length) {
                const connection = allConnections[i]
                if (connection != null) {
                    if (getUniqueId(connection) === thisId) {
                        dropWebsocketConnection(connection)
                        allConnections.splice(i, 1)
                        console.log(
                            `<--  disconnected from ${ipAddr} (${userName}/${userId}) [DUPLICATE], connections = ${allConnections.length}`
                        )
                        i--
                    }
                }
            }
        }
    } catch (err) {
        console.log(err)
    }

    allConnections.push(socket)

    console.log(`-->  connected to ${ipAddr} (${userName}/${userId}), connections = ${allConnections.length}`)

    if (!userId || userId === "" || userId === "undefined" || userId === "unknown") {
        console.log(`    !!  DENIED: no user !!`)
        try {
            dropWebsocketConnection(socket)
        } catch (err) {}
    }
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/battle", (req, res) => {
    const { battle, passphrase, balancer } = req.body

    if (passphrase === "dqv$dYT65YrU%s") {
        battles[battle._id] = new Battle(battle, balancer, io, (id, intervalId) => {
            clearInterval(intervalId)
            delete battles[id]
        })
    }

    // Creates a battle
    return res.send(battle._id)
})

app.get("/balancer/:balancerId", (req, res) => {
    const balancerId = req.params.balancerId

    if (balancers[balancerId]) {
        return res.sendStatus(200)
    }

    balancers[balancerId] = new Balancer(balancerId, io)
    return res.sendStatus(200)
})

app.delete("/battle/:battleId", (req, res) => {
    const battleId = req.params.battleId

    const targetBattle = battles[battleId]
    if (!targetBattle) {
        return res.sendStatus(404)
    }

    targetBattle.removeBattle(targetBattle.id, targetBattle.intervalId)

    if (battles[battleId]) {
        return res.sendStatus(500)
    }

    return res.sendStatus(201)
})

// `httpServer` inherits `net` emitted events
// https://nodejs.org/api/net.html#net_event_timeout
server.on("timeout", function (socket) {
    // Emitted if the socket times out from inactivity. This is only to notify that the
    // socket has been idle. The user must manually close the connection.

    dropWebsocketConnection(socket)
})

// `httpServer` inherits `net` emitted events
// https://nodejs.org/api/net.html#net_event_error_1
server.on("error", function (err) {
    // Emitted when an error occurs. The 'close' event will be called directly following this event.

    console.log("Battle server error emitted:")
    console.log(err)

    // Note: since the socket is automatically closed, no further logic here.
})

// `httpServer` event
// https://nodejs.org/api/http.html#http_event_clienterror
server.on("clientError", function (err, socket) {
    // If a client connection emits an 'error' event, it will be forwarded here.  Listener of this
    // event is responsible for closing/destroying the underlying socket.

    console.log("Battle server clientError emitted:")
    console.log(err)

    dropWebsocketConnection(socket)
})

server.listen(port)
