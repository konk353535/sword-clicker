import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const FloorWaveScores = new Mongo.Collection("floorWaveScores")

FloorWaveScoresSchema = new SimpleSchema({
    floor: { type: Number },
    server: { type: String },
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    points: { type: Number, decimal: true, defaultValue: 0 },
    username: { type: String }
})

FloorWaveScores.attachSchema(FloorWaveScoresSchema)
