import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Woodcutting = new Mongo.Collection("woodcutting")

const WoodcuttingSchema = new SimpleSchema({
    woodcutters: { type: [Object], blackbox: true },
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    lastGameUpdated: { type: Date }
})

Woodcutting.attachSchema(WoodcuttingSchema)
