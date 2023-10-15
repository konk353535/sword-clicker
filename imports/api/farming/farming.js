import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Farming = new Mongo.Collection("farming")
export const FarmingSpace = new Mongo.Collection("farmingSpace")

const FarmingSpaceSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    active: { type: Boolean }, // Active means usable, can be turned off for donator spaces
    index: { type: Number },
    plantId: { type: String, optional: true },
    water: { type: Number, decimal: true, optional: true },
    maturityDate: { type: Date, optional: true }, // When this plant will finish growing
    growing: { type: Boolean, optional: true },
    plantDate: { type: Date, optional: true }
})

FarmingSpace.attachSchema(FarmingSpaceSchema)

const FarmingSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    lastGameUpdated: { type: Date, defaultValue: new Date() }
})

Farming.attachSchema(FarmingSchema)
