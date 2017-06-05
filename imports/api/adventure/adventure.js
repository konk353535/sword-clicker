import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Adventure = new Mongo.Collection('adventure');

AdventureSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  lastGameUpdated: { type: Date, defaultValue: new Date() },
  adventures: { type: [Object] },
  'adventures.$.level': { type: Number }, // Determines XP / Chance of success
  'adventures.$.length': { type: String }, // Short, Long, Epic
  'adventures.$.floor': { type: Number }, // Floor this represents
  'adventures.$.room': { type: Number }, // Room this represents
  'adventures.$.duration': { type: Number }, // Duration in seconds 
  'adventures.$.type': { type: String }, // Magic / Melee (Determines XP reward types)
  'adventures.$.startDate': { type: Date, optional: true }, // When this adventure is 'started'
  'adventures.$.endDate': { type: Date, optional: true }, // When this adventure is 'complete'
  'adventures.$.win': { type: Number, optional: true } // Was it a win / loss (win = loot, loss = just XP)
  'adventures.$.rewards': { type: [Object], blackbox: true, optional: true } // List of XP + loot rewards (User clicks collect to get them)
});

Adventure.attachSchema(AdventureSchema);
