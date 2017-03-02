import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Skills = new Mongo.Collection('skills');
 
SkillsSchema = new SimpleSchema({
  type: { type: String },
  createdAt: { type: Date },
  xp: { type: Number, defaultValue: 0 },
  level: { type: Number, defaultValue: 1 },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
});

Skills.attachSchema(SkillsSchema);

if (Meteor.isServer) {
  import { SKILLS } from '../../../server/constants.js';

  Meteor.publish('skills', function() {

    //Transform function
    var transform = function(doc) {
      doc.xpToLevel = SKILLS.mining.xpToLevel(doc.level);
      return doc;
    }

    var self = this;

    var observer = Skills.find({
      owner: this.userId
    }).observe({
        added: function (document) {
        self.added('skills', document._id, transform(document));
      },
      changed: function (newDocument, oldDocument) {
        self.changed('skills', oldDocument._id, transform(newDocument));
      },
      removed: function (oldDocument) {
        self.removed('skills', oldDocument._id);
      }
    });

    self.onStop(function () {
      observer.stop();
    });

    self.ready();

  });
}
