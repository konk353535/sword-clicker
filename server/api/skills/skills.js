import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { SKILLS } from '/server/constants/skills.js';

export const addXp = function (skillType, xp) {
  console.log(`Addxp ${skillType} - #${xp}`);
  const skill = Skills.findOne({ owner: Meteor.userId(), type: skillType });
  const skillConstants = SKILLS[skill.type];

  skill.xp += xp;
  const xpToNextLevel = skillConstants.xpToLevel(skill.level);
  if (skill.xp > xpToNextLevel) {
    // Update Level
    Skills.update(skill._id, {
      $inc: { level: 1 },
      $set: { xp: (skill.xp % xpToNextLevel) }
    })
  } else {
    // Just update exp
    Skills.update(skill._id, {
      $set: { xp: skill.xp }
    });
  }
}

Meteor.methods({
  'skills.learnSkill'(skillName) {
    // Make sure this is a valid skillName
    if (!_.contains(Object.keys(SKILLS), skillName)) {
      return;
    }

    const existingSkill = Skills.findOne({ owner: Meteor.userId(), type: skillName });

    if (!existingSkill) {
      Skills.insert({
        type: skillName,
        createdAt: new Date(),
        owner: Meteor.userId()
      });
    }
  }
});

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
