import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Mining = new Mongo.Collection('mining');
 
MiningSchema = new SimpleSchema({
  oreMatrix: { type: [Object] },
  'oreMatrix.$.empty': { type: Boolean },
  'oreMatrix.$.oreId': { type: String, optional: true },
  'oreMatrix.$.health': { type: Number, optional: true },
  miners: { type: Number, defaultValue: 0 },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
});

Mining.attachSchema(MiningSchema);

if (Meteor.isServer) {
  import { MINING } from '../../../server/constants.js';

  Meteor.publish('mining', function() {

    //Transform function
    var transform = function(doc) {
      doc.oreMatrix.forEach((currentOre) => {
        if (currentOre.oreId) {
          const currentOreConstants = MINING.ores[currentOre.oreId];
          currentOre.requiredLevel = currentOreConstants.requiredLevel;
          currentOre.maxHealth = currentOreConstants.maxHealth;
          currentOre.icon = currentOreConstants.icon;
        }
      });

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
