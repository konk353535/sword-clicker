import client from "prom-client"

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: "meteor"
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

WebApp.connectHandlers.use("/metrics", async (req, res, next) => {
    res.setHeader("Content-Type", register.contentType)
    res.end(await register.metrics())
})
