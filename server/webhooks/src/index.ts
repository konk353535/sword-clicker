import express from "express"
import http from "http"
import https from "https"
import { ObjectId } from "mongodb"
import fs from "node:fs"
import { Stripe } from "stripe"
import { client, connect, fulfillmentCollection, usersCollection } from "./db"
import { env } from "./validateEnv"

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
const app = express()

const validItems = {
    [env.GEM_BUNCH]: 500,
    [env.GEM_BAG]: 2200,
    [env.GEM_BOX]: 6000
}

const validItemKeys = Object.keys(validItems)

// List from https://stripe.com/docs/ips#webhook-notifications
// TODO: validate incoming IP address (proxied by CF) is from this list
// const validStripeWebhookIps = [
//     "3.18.12.63",
//     "3.130.192.231",
//     "13.235.14.237",
//     "13.235.122.149",
//     "18.211.135.69",
//     "35.154.171.200",
//     "52.15.183.38",
//     "54.88.130.119",
//     "54.88.130.237",
//     "54.187.174.169",
//     "54.187.205.235",
//     "54.187.216.72"
// ]

// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
app.post("/webhook/stripe", express.raw({ type: "application/json" }), async (request, response) => {
    const sig = request.headers["stripe-signature"]

    if (sig == null) {
        response.status(400).send(`Webhook Error: missing stripe-signature`)
        return
    }

    let event

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        response.status(400).send(`Webhook Error: ${(err as Error).message}`)
        return
    }

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            // const paymentIntent = event.data.object
            // console.log("PaymentIntent was successful!")
            break
        }
        case "payment_method.attached": {
            // const paymentMethod = event.data.object
            // console.log("PaymentMethod was attached to a Customer!")
            break
        }
        // Handle the checkout.session.completed event
        case "checkout.session.completed": {
            const existingEvent = await fulfillmentCollection.findOne({ eventId: event.id })

            if (existingEvent != null) {
                // already processed, return
                response.status(200).json({ received: true })
                return
            }

            if (event.data.object.metadata == null) {
                // bad
                response.status(400).send(`Webhook Error: metadata cannot be null`)
                return
            }

            const userId = event.data.object.metadata?.userId
            const username = event.data.object.metadata?.username

            if (userId == null || username == null) {
                // also bad
                response.status(400).send(`Webhook Error: metadata.userId or metadata.username cannot be null`)
                return
            }

            // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
            const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
                expand: ["line_items"]
            })
            const lineItems = sessionWithLineItems.line_items
            // line items should be an array of one item, but just in case ...
            let gemsToGrant = 0

            lineItems?.data.forEach((item) => {
                if (item?.price != null) {
                    if (validItemKeys.includes(item.price.id)) {
                        // valid, lookup the grant and add it
                        gemsToGrant += validItems[item.price.id]!
                    }
                }
            })

            // grant
            const grantResponse = await usersCollection.updateOne({ _id: userId as unknown as ObjectId }, { $inc: { gems: gemsToGrant } })

            // add to fulfillment collection
            const fulfillmentResponse = await fulfillmentCollection.insertOne({
                ownerId: userId,
                eventId: event.id,
                gems: gemsToGrant,
                createdAt: new Date()
            })

            console.log(`Granted ${gemsToGrant} gems to ${username} (id: ${userId})`)

            break
        }
        default: {
            // console.log(`Unhandled event type ${event.type}`)
        }
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true })
})

let server: ReturnType<typeof https.createServer> | ReturnType<typeof http.createServer>

if (env.NODE_ENV === "production") {
    const options = {
        key: fs.readFileSync("/ssl/privkey1.pem"),
        cert: fs.readFileSync("/ssl/cert1.pem")
    }

    server = https.createServer(options, app)
} else {
    server = http.createServer(app)
}

const run = async () => {
    let hasConnected = false
    while (!hasConnected) {
        hasConnected = await connect()
    }

    server.listen(env.PORT, "0.0.0.0", () => console.log(`Running on port ${env.PORT}`))
}

process.on("SIGINT", function () {
    client.close()
    process.exit(0)
})

run()
