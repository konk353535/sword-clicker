import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const BlackList = new Mongo.Collection("blackList")

const BlackListSchema = new SimpleSchema({
    clientIp: { type: String }
})

BlackList.attachSchema(BlackListSchema)
