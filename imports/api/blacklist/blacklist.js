import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BlackList = new Mongo.Collection('blackList');

BlackListSchema = new SimpleSchema({
  clientIp: { type: String }
});

BlackList.attachSchema(BlackListSchema);
