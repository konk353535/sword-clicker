import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const FloorLoot = new Mongo.Collection("floorLoot")

FloorLootSchema = new SimpleSchema({
    floor: { type: Number },
    server: { type: String },
    type: { type: String },
    itemId: { type: String, optional: true },
    amount: { type: Number }
})

FloorLoot.attachSchema(FloorLootSchema)
