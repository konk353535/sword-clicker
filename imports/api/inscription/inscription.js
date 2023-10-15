import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Inscription = new Mongo.Collection("inscription")

const InscriptionSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    inscriptionLevel: { type: Number, optional: true },
    currentlyCrafting: { type: [Object], optional: true },
    "currentlyCrafting.$.itemId": { type: String },
    "currentlyCrafting.$.recipeId": { type: String },
    "currentlyCrafting.$.startDate": { type: Date },
    "currentlyCrafting.$.endDate": { type: Date },
    "currentlyCrafting.$.amount": { type: Number }
})

Inscription.attachSchema(InscriptionSchema)
