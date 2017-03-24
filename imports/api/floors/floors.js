import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Floors = new Mongo.Collection('floors');
 
FloorsSchema = new SimpleSchema({
  floor: { type: Number },
  createdAt: { type: Date },
  finishedAt: { type: Date, optional: true },
  easyWaves: { type: Number, min: 0 },
  easyWavesTotal: { type: Number },
  hardWaves: { type: Number, min: 0 },
  hardWavesTotal: { type: Number },
  veryHardWaves: { type: Number, min: 0 },
  veryHardWavesTotal: { type: Number },
  floorComplete: { type: Boolean, defaultValue: false }
});

Floors.attachSchema(FloorsSchema);
