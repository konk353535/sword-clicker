import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { CInt } from '/imports/utils.js';
import { createNewFloor } from '/imports/api/floors/floors';
import { createTown } from '/imports/api/town/town';

export const Servers = new Mongo.Collection('servers');

export const DEFAULT_SERVER = 'Classic';
export const CLASSIC_SERVER = 'Classic';

export const createNewServer = function createNewServer(name, iteration = 0) {
  // default server name
  if (!name || (typeof name !== 'string')) {
    name = DEFAULT_SERVER;
  }
  name = name.trim();
  
  // check if server already exists (by name)
  if (Servers.findOne({name})) {
    return false;
  }
  
  // default server iteration
  iteration = CInt(iteration);
  if (iteration <= 0) {
    const highestIterationServerDoc = Servers.find({}, { sort: { iteration: -1 }, limit: 1}).fetch();
    if (!highestIterationServerDoc || (highestIterationServerDoc.length === 0)) {
      iteration = 0;
    } else {
      iteration = CInt(highestIterationServerDoc[0].iteration) + 1;
    }
  }

  // check if server already exists (by iteration)
  if (Servers.findOne({iteration})) {
    return false;
  }
  
  // create the new server
  const newServer = Servers.insert({
    iteration,
    name: name,
    createdAt: new Date(),
    membersCount: 0,
    disabled: false,
    announcement: '',
    town: {
      day1goods: [],
      day2goods: [],
      day3goods: [],
      day4goods: [],
      day5goods: [],
      day6goods: [],
      day7goods: [],
    }
  });
  
  // get a reference to the new server
  const serverDoc = Servers.findOne({name});

  if (newServer || serverDoc) {
    // if we created the server, then create the first floor data
    createNewFloor((serverDoc._id) ? serverDoc._id : newServer, 1);
    
    // and town data
    createTown((serverDoc._id) ? serverDoc._id : newServer);
    
    // and return the server ID
    return (serverDoc._id) ? serverDoc._id : newServer;
  }

  return false;
};

export const setServerStatus = function setServerStatus({serverId, name, enabled, announcement}) {
  // ensure we're referencing a valid server ID
  if (!serverId || (typeof serverId !== 'string')) {
    return false;
  }
  
  // find the server doc matching the ID
  const serverDoc = Servers.findOne({_id: serverId})
  if (!serverDoc) {
    return false;
  }
  
  // count how many fields were updated
  let updatedFields = 0;
  
  // if the 'name' field was supplied, update it
  if ((name !== undefined) && (typeof name === 'string')) {
    Servers.update({
        _id: serverDoc._id
      }, {
        $set: {
          name: name.trim()
        }
      }
    );
    updatedFields++;
  }
  
  // if the 'enabled' field was supplied, update it
  if (enabled !== undefined) {
    Servers.update({
        _id: serverDoc._id
      }, {
        $set: {
          disabled: !enabled
        }
      }
    );
    updatedFields++;
  }
  
  // if the 'announcement' field was supplied, update it
  if ((announcement !== undefined) && (typeof announcement === 'string')) {
    Servers.update({
        _id: serverDoc._id
      }, {
        $set: {
          announcement: announcement.trim()
        }
      }
    );
    updatedFields++;
  }
  
  // return how many fields were updated
  return updatedFields;
};


ServersSchema = new SimpleSchema({
  iteration: { type: Number },
  name: { type: String },
  createdAt: { type: Date },
  membersCount: { type: Number },
  disabled: { type: Boolean },
  announcement: { type: String },
  town: { type: Object },
  'town.day1goods': { type: Array },
  'town.day1goods.$': { type: Object },
  'town.day1goods.$.townBuilding': { type: String },
  'town.day1goods.$.itemId': { type: String },
  'town.day1goods.$.rarityId': { type: String, optional: true },
  'town.day1goods.$.count': { type: Number },
  'town.day1goods.$.owner': { type: String },
  'town.day1goods.$.username': { type: String },
  'town.day2goods': { type: Array },
  'town.day2goods.$': { type: Object },
  'town.day2goods.$.townBuilding': { type: String },
  'town.day2goods.$.itemId': { type: String },
  'town.day2goods.$.rarityId': { type: String, optional: true },
  'town.day2goods.$.count': { type: Number },
  'town.day2goods.$.owner': { type: String },
  'town.day2goods.$.username': { type: String },
  'town.day3goods': { type: Array },
  'town.day3goods.$': { type: Object },
  'town.day3goods.$.townBuilding': { type: String },
  'town.day3goods.$.itemId': { type: String },
  'town.day3goods.$.rarityId': { type: String, optional: true },
  'town.day3goods.$.count': { type: Number },
  'town.day3goods.$.owner': { type: String },
  'town.day3goods.$.username': { type: String },
  'town.day4goods': { type: Array },
  'town.day4goods.$': { type: Object },
  'town.day4goods.$.townBuilding': { type: String },
  'town.day4goods.$.itemId': { type: String },
  'town.day4goods.$.rarityId': { type: String, optional: true },
  'town.day4goods.$.count': { type: Number },
  'town.day4goods.$.owner': { type: String },
  'town.day4goods.$.username': { type: String },
  'town.day5goods': { type: Array },
  'town.day5goods.$': { type: Object },
  'town.day5goods.$.townBuilding': { type: String },
  'town.day5goods.$.itemId': { type: String },
  'town.day5goods.$.rarityId': { type: String, optional: true },
  'town.day5goods.$.count': { type: Number },
  'town.day5goods.$.owner': { type: String },
  'town.day5goods.$.username': { type: String },
  'town.day6goods': { type: Array },
  'town.day6goods.$': { type: Object },
  'town.day6goods.$.townBuilding': { type: String },
  'town.day6goods.$.itemId': { type: String },
  'town.day6goods.$.rarityId': { type: String, optional: true },
  'town.day6goods.$.count': { type: Number },
  'town.day6goods.$.owner': { type: String },
  'town.day6goods.$.username': { type: String },
  'town.day7goods': { type: Array },
  'town.day7goods.$': { type: Object },
  'town.day7goods.$.townBuilding': { type: String },
  'town.day7goods.$.itemId': { type: String },
  'town.day7goods.$.rarityId': { type: String, optional: true },
  'town.day7goods.$.count': { type: Number },
  'town.day7goods.$.owner': { type: String },
  'town.day7goods.$.username': { type: String },
});

Servers.attachSchema(ServersSchema);
