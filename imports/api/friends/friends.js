import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Friends = new Mongo.Collection('friend');

FriendsSchema = new SimpleSchema({
  friends: { type: [String] },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
});

Friends.attachSchema(FriendsSchema);
