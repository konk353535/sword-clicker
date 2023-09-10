import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Abilities = new Mongo.Collection("abilities")

AbilitiesSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    lastGameUpdated: { type: Date, defaultValue: new Date() },
    learntAbilities: { type: [Object] },
    "learntAbilities.$.abilityId": { type: String },
    "learntAbilities.$.equipped": { type: Boolean, defaultValue: false },
    "learntAbilities.$.slot": { type: String, optional: true },
    "learntAbilities.$.casts": { type: Number, optional: true },
    "learntAbilities.$.isSpell": { type: Boolean, optional: true },
    "learntAbilities.$.currentCooldown": { type: Number, decimal: true, defaultValue: 0 },
    "learntAbilities.$.level": { type: Number }
})

Abilities.attachSchema(AbilitiesSchema)
