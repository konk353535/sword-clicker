import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Crafting = new Mongo.Collection("crafting")

const CraftingSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    craftingLevel: { type: Number, optional: true },
    currentlyCrafting: { type: [Object], optional: true },
    "currentlyCrafting.$.itemId": { type: String },
    "currentlyCrafting.$.recipeId": { type: String },
    "currentlyCrafting.$.startDate": { type: Date },
    "currentlyCrafting.$.endDate": { type: Date },
    "currentlyCrafting.$.amount": { type: Number },
    currentlyReforging: { type: [Object], defaultValue: [] },
    "currentlyReforging.$.origUid": { type: String },
    "currentlyReforging.$.itemId": { type: String },
    "currentlyReforging.$.currentRarityId": { type: String },
    "currentlyReforging.$.itemData": { type: String },
    "currentlyReforging.$.reforgeData": { type: String },
    "currentlyReforging.$.startDate": { type: Date },
    "currentlyReforging.$.endDate": { type: Date },
    learntCrafts: { type: Object, blackbox: true, optional: true },
    expiringCrafts: { type: Object, blackbox: true, optional: true }
})

Crafting.attachSchema(CraftingSchema)
