import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Floors = new Mongo.Collection('floors');
 
FloorsSchema = new SimpleSchema({
  game: { type: String },
  floor: { type: Number },
  createdAt: { type: Date },
  finishedAt: { type: Date, optional: true },
  points: { type: Number, decimal: true, defaultValue: 0 },
  pointsMax: { type: Number, defaultValue: 10000 },
  health: { type: Number, decimal: true, defaultValue: 1000 },
  healthMax: { type: Number, defaultValue: 1000 },  
  floorComplete: { type: Boolean, defaultValue: false }
});

Floors.attachSchema(FloorsSchema);
