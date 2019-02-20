import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Servers = new Mongo.Collection('servers');
export const Town = new Mongo.Collection('town'); // pseudo-collection that's a sub-collection of Servers

ServersSchema = new SimpleSchema({
  iteration: { type: Number },
  name: { type: String },
  createdAt: { type: Date },
  membersCount: { type: Number },
  disabled: { type: Boolean, optional: true },
  announcement: { type: String, optional: true },
  town: { type: Object, optional: true },
  'town.day1goods': { type: Array, optional: true },
  'town.day1goods.$': { type: Object },
  'town.day1goods.$.townBuilding': { type: String },
  'town.day1goods.$.itemId': { type: String },
  'town.day1goods.$.count': { type: Number },
  'town.day1goods.$.owner': { type: String },
  'town.day1goods.$.username': { type: String },
  'town.day2goods': { type: Array, optional: true },
  'town.day2goods.$': { type: Object },
  'town.day2goods.$.townBuilding': { type: String },
  'town.day2goods.$.itemId': { type: String },
  'town.day2goods.$.count': { type: Number },
  'town.day2goods.$.owner': { type: String },
  'town.day2goods.$.username': { type: String },
  'town.day3goods': { type: Array, optional: true },
  'town.day3goods.$': { type: Object },
  'town.day3goods.$.townBuilding': { type: String },
  'town.day3goods.$.itemId': { type: String },
  'town.day3goods.$.count': { type: Number },
  'town.day3goods.$.owner': { type: String },
  'town.day3goods.$.username': { type: String },
  'town.day4goods': { type: Array, optional: true },
  'town.day4goods.$': { type: Object },
  'town.day4goods.$.townBuilding': { type: String },
  'town.day4goods.$.itemId': { type: String },
  'town.day4goods.$.count': { type: Number },
  'town.day4goods.$.owner': { type: String },
  'town.day4goods.$.username': { type: String },
  'town.day5goods': { type: Array, optional: true },
  'town.day5goods.$': { type: Object },
  'town.day5goods.$.townBuilding': { type: String },
  'town.day5goods.$.itemId': { type: String },
  'town.day5goods.$.count': { type: Number },
  'town.day5goods.$.owner': { type: String },
  'town.day5goods.$.username': { type: String },
  'town.day6goods': { type: Array, optional: true },
  'town.day6goods.$': { type: Object },
  'town.day6goods.$.townBuilding': { type: String },
  'town.day6goods.$.itemId': { type: String },
  'town.day6goods.$.count': { type: Number },
  'town.day6goods.$.owner': { type: String },
  'town.day6goods.$.username': { type: String },
  'town.day7goods': { type: Array, optional: true },
  'town.day7goods.$': { type: Object },
  'town.day7goods.$.townBuilding': { type: String },
  'town.day7goods.$.itemId': { type: String },
  'town.day7goods.$.count': { type: Number },
  'town.day7goods.$.owner': { type: String },
  'town.day7goods.$.username': { type: String },
});

Servers.attachSchema(ServersSchema);

export const createTown = function createTown({serverId}) {
  // Update user activity
  Servers.update({
    _id: serverId
  }, {
    $set: {
      town: {
        day1goods: [ ],
        day2goods: [ ],
        day3goods: [ ],
        day4goods: [ ],
        day5goods: [ ],
        day6goods: [ ],
        day7goods: [ ],
      }
    }
  });
};
