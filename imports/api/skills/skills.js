import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Skills = new Mongo.Collection("skills")

SkillsSchema = new SimpleSchema({
    type: { type: String },
    createdAt: { type: Date },
    xp: { type: Number, defaultValue: 0, decimal: true },
    totalXp: { type: Number, defaultValue: 0, decimal: true },
    banned: { type: Boolean, optional: true },
    username: { type: String },
    server: { type: String },
    level: { type: Number, defaultValue: 1 },
    rank: { type: Number, optional: true },
    icon: { type: String, optional: true },
    owner: { type: String, regEx: SimpleSchema.RegEx.Id }
})

Skills.attachSchema(SkillsSchema)
