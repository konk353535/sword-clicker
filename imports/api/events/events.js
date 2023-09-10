import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Events = new Mongo.Collection("events")

EventsSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    event: { type: String },
    data: { type: Object, blackbox: true, optional: true },
    date: { type: Date }
})

Events.attachSchema(EventsSchema)
