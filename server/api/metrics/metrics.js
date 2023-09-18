import client from "prom-client"
import { env } from "../../validateEnv"

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: "meteor"
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

WebApp.connectHandlers.use("/metrics", async (req, res, next) => {
    // basic auth
    const b64auth = (req.headers.authorization || "").split(" ")[1] || ""
    const strauth = Buffer.from(b64auth, "base64").toString()
    const splitIndex = strauth.indexOf(":")
    const login = strauth.substring(0, splitIndex)
    const password = strauth.substring(splitIndex + 1)
    if (login === env.METRIC_BASIC_AUTH_USER && password === env.METRIC_BASIC_AUTH_PASS) {
        res.setHeader("Content-Type", register.contentType)
        return res.end(await register.metrics())
    } else {
        res.statusCode = 401
        return res.end()
    }
})
