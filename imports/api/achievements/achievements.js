import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Achievements = new Mongo.Collection("achievements")

AchievementsSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    lastGameUpdated: { type: Date, defaultValue: new Date() },
    collected: { type: Object, blackbox: true }
})
