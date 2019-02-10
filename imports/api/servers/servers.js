import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Servers = new Mongo.Collection('servers');

ServersSchema = new SimpleSchema({
  iteration: { type: Number },
  name: { type: String },
  createdAt: { type: Date },
  membersCount: { type: Number },
  disabled: { type: Boolean, optional: true },
  announcement: { type: String, optional: true },
});

Servers.attachSchema(ServersSchema);
