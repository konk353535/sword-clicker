import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Astronomy = new Mongo.Collection('astronomy');

AstronomySchema = new SimpleSchema({
  mages: { type: [Object] },
  'mages.$.type': { type: String, optional: true }, // Fire, Water, Air, Earth, or Empty (All)
  'mages.$.stats': { type: Object, blackbox: true },
  'mages.$.id': { type: String, optional: true }, // This wasn't always here
  'mages.$.gold': { type: Number, optional: true, decimal: true },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  lastGameUpdated: { type: Date, defaultValue: new Date() }
});

Astronomy.attachSchema(AstronomySchema);
