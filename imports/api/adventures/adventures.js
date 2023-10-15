import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Adventures = new Mongo.Collection("adventures")

const AdventuresSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    lastGameUpdated: { type: Date, defaultValue: new Date() },
    timeTillUpdate: { type: Number, decimal: true },
    adventures: { type: [Object] },
    "adventures.$.id": { type: String },
    "adventures.$.level": { type: Number }, // Determines XP / Chance of success
    "adventures.$.length": { type: String }, // Short, Long, Epic
    "adventures.$.floor": { type: Number }, // Floor this represents
    "adventures.$.room": { type: Number }, // Room this represents
    "adventures.$.duration": { type: Number }, // Duration in seconds
    "adventures.$.type": { type: String }, // Magic / Melee (Determines XP reward types)
    "adventures.$.startDate": { type: Date, optional: true }, // When this adventure is 'started'
    "adventures.$.endDate": { type: Date, optional: true }, // When this adventure is 'complete'
    "adventures.$.win": { type: Boolean, optional: true }, // Was it a win / loss (win = loot, loss = just XP)
    "adventures.$.rewards": { type: [Object], blackbox: true, optional: true } // List of XP + loot rewards (User clicks collect to get them)
})

Adventures.attachSchema(AdventuresSchema)

// 1 - On account creation inject adventure collection
// 2 - Call update game method for adventures every so often
// 3 - This will populate the list of adventures
