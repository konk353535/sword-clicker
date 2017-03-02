import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Mining = new Mongo.Collection('mining');
export const MiningSpace = new Mongo.Collection('miningSpace');

MiningSpaceSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  oreId: { type: String, optional: true },
  index: { type: Number },
  health: { type: Number, defaultValue: 0 }
});

MiningSpace.attachSchema(MiningSpaceSchema);

MiningSchema = new SimpleSchema({
  miners: { type: Number, defaultValue: 0 },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
});

Mining.attachSchema(MiningSchema);

Meteor.methods({
  'mining.clickedMineSpace'(mineSpaceId) {
    console.log(mineSpaceId);
    const mineSpace = MiningSpace.findOne({ id: mineSpaceId, owner: this.userId });
    console.log(mineSpace);
    MiningSpace.update(mineSpace._id, {
      $inc: { health: -1 },
    });
  }
});

if (Meteor.isServer) {
  import { MINING } from '../../../server/constants.js';

  Meteor.publish('miningSpace', function() {

    //Transform function
    var transform = function(doc) {
      if (doc.oreId) {
        const currentOreConstants = MINING.ores[doc.oreId];
        doc.requiredLevel = currentOreConstants.requiredLevel;
        doc.maxHealth = currentOreConstants.maxHealth;
        doc.icon = currentOreConstants.icon;
      }
      return doc;
    }

    var self = this;

    var observer = MiningSpace.find({
      owner: this.userId
    }).observe({
        added: function (document) {
        self.added('miningSpace', document._id, transform(document));
      },
      changed: function (newDocument, oldDocument) {
        self.changed('miningSpace', oldDocument._id, transform(newDocument));
      },
      removed: function (oldDocument) {
        self.removed('miningSpace', oldDocument._id);
      }
    });

    self.onStop(function () {
      observer.stop();
    });

    self.ready();

  });

  Meteor.publish('mining', function() {

    //Transform function
    var transform = function(doc) {
      return doc;
    }

    var self = this;

    var observer = Mining.find({
      owner: this.userId
    }).observe({
        added: function (document) {
        self.added('mining', document._id, transform(document));
      },
      changed: function (newDocument, oldDocument) {
        self.changed('mining', oldDocument._id, transform(newDocument));
      },
      removed: function (oldDocument) {
        self.removed('mining', oldDocument._id);
      }
    });

    self.onStop(function () {
      observer.stop();
    });

    self.ready();

  });
}
