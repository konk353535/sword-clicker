import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Servers } from '/imports/api/servers/servers';

export const Town = new Mongo.Collection('town'); // pseudo-collection that's a sub-collection of Servers

export const createTown = function createTown(serverId) {
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
