import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

export const Friends = new Mongo.Collection("friend")

const FriendsSchema = new SimpleSchema({
    friends: { type: [String] },
    owner: { type: String, regEx: SimpleSchema.RegEx.Id }
})

Friends.attachSchema(FriendsSchema)
