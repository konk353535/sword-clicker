import type Battle from "../"

export function postTick(this: Battle) {
    if (this.tickEvents.length > 0 || this.deltaEvents.length > 0) {
        try {
            const data = this
            const connections = data.io.of(`/${this.balancer}`)

            // Disabled: don't emit to disconnected sockets
            // this.io.of(`/${this.balancer}`).emit("tick", {
            //     tickEvents: this.tickEvents,
            //     deltaEvents: this.deltaEvents,
            //     tickCount: this.tickCount
            // })

            Array.from(connections.sockets.entries())
                .map(([k, v]) => ({ [k]: v }))
                .forEach(function (connectedSocket_raw) {
                    try {
                        // @ts-expect-error
                        const connectedSocket = connectedSocket_raw[Object.keys(connectedSocket_raw)[0]]

                        connectedSocket.emit("tick", {
                            tickEvents: data.tickEvents,
                            deltaEvents: data.deltaEvents,
                            tickCount: data.tickCount,
                            roomTickCount: data.roomTickCount
                        })
                    } catch (err) {
                        console.log(err)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    this.deltaEvents = []
    this.battleActions = []
    this.tickEvents = []
}
