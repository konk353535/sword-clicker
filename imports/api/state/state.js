import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const State = new Mongo.Collection("state")

const StateSchema = new SimpleSchema({
    name: { type: String },
    server: { type: String, optional: true },
    value: { type: Object, blackbox: true, optional: true }
})

State.attachSchema(StateSchema)
