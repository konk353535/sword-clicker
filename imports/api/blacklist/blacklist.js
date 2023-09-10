import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const BlackList = new Mongo.Collection("blackList")

BlackListSchema = new SimpleSchema({
    clientIp: { type: String }
})

BlackList.attachSchema(BlackListSchema)
