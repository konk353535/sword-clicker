// routes.js

import bodyParser from "body-parser"
import { Meteor } from "meteor/meteor"

const checkSessionCompleted = async (request) => {
    const payload = request.body
    const sig = request.headers["stripe-signature"]

    console.log("Got payload: ", request.body)
    console.log("headers", JSON.stringify(request.headers, null, 2))
    console.log("sig", sig)
    console.log("wh sec", Meteor.settings.private.stripe.webhook_secret)

    let event

    try {
        event = stripe.webhooks.constructEvent(JSON.stringify(request.body, null, 2), sig, Meteor.settings.private.stripe.webhook_secret)
    } catch (err) {
        console.log("err", err)
        response.statusCode = 400
        return response.end()
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
            expand: ["line_items"]
        })
        const lineItems = sessionWithLineItems.line_items
        console.log("event", JSON.stringify(event, null, 2))
        console.log("line items", JSON.stringify(lineItems, null, 2))

        // Fulfill the purchase...
        // fulfillOrder(lineItems)
    }

    response.statusCode = 200
    return response.end()
}

const stripe = require("stripe")(Meteor.settings.private.stripe.key)

Picker.route("/webhook/stripe", async (params, request, response, next) => {
    let data = ""
    request.on("data", (chunk) => {
        data += chunk
    })

    request.on("end", async () => {
        // console.log("No more data.")
        // console.log(data)

        // const payload = data
        const sig = request.headers["stripe-signature"]

        // console.log("Got payload: ", data)
        // console.log("headers", JSON.stringify(request.headers, null, 2))
        // console.log("sig", sig)
        // console.log("wh sec", Meteor.settings.private.stripe.webhook_secret)

        let event

        try {
            event = stripe.webhooks.constructEvent(data, sig, Meteor.settings.private.stripe.webhook_secret)
        } catch (err) {
            console.log("err", err)
            response.statusCode = 400
            return response.end()
        }

        // Handle the checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
            const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
                expand: ["line_items"]
            })
            const lineItems = sessionWithLineItems.line_items
            console.log("event", JSON.stringify(event, null, 2))
            console.log("line items", JSON.stringify(lineItems, null, 2))

            // Fulfill the purchase...
            // fulfillOrder(lineItems)
        }

        response.statusCode = 200
        return response.end()

        response.writeHead(200, { "Content-Type": "text/plain" })
        response.end("ok")
    })
}).middleware(bodyParser.raw())
