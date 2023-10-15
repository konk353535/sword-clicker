import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const BossHealthScores = new Mongo.Collection("bossHealthScores")

const BossHealthScoresSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    username: { type: String },
    server: { type: String },
    bossDamage: { type: Number, decimal: true, defaultValue: 0 }
})

BossHealthScores.attachSchema(BossHealthScoresSchema)
