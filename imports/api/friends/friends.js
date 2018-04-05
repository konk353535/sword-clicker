import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Friends = new Mongo.Collection('friend');
export const FriendRequests = new Mongo.Collection('friendRequests');

FriendsSchema = new SimpleSchema({
  friends: { type: [String] },
  game: { type: String, regEx: SimpleSchema.RegEx.Id },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
});

Friends.attachSchema(FriendsSchema);

FriendRequestsSchema = new SimpleSchema({
  game: { type: String, regEx: SimpleSchema.RegEx.Id },
  sender: { type: String, regEx: SimpleSchema.RegEx.Id },
  senderName: { type: String },
  reciever: { type: String, regEx: SimpleSchema.RegEx.Id },
  recieverName: { type: String }
});

FriendRequests.attachSchema(FriendRequestsSchema);
