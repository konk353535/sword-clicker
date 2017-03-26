import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';

import './skills.html';

Template.skillsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('selectedSkill', 'total');

  this.autorun(() => {
    const skillName = this.state.get('selectedSkill');
    Meteor.call('skills.highscores', skillName, (err, res) => {
      res.forEach((item, index) => {
        item.rank = index + 1;
      });
      this.state.set('highscores', res);
    });
  });
});

Template.skillsPage.events({
  'click .select-skill'(event, instance) {
    const skillName = $(event.target).closest('.select-skill')[0].getAttribute('data-name');
    instance.state.set('selectedSkill', skillName);
  }
});

Template.skillsPage.helpers({
  skills() {
    const mostSkills = Skills.find({
      type: {
        $not: 'total'
      }
    }).fetch();

    const totalSkill = Skills.findOne({ type: 'total' });

    return mostSkills.map((skill) => {
      skill.percentage = Math.round((skill.xp / skill.xpToLevel) * 100);
      return skill;
    }).concat([totalSkill]);
  },

  possibleSkills() {
    return [
      { type: 'total' },
      { type: 'attack' },
      { type: 'defense' },
      { type: 'mining' },
      { type: 'farming' },
      { type: 'crafting' },
      { type: 'woodcutting' },
      { type: 'health' }
    ];
  },

  highscores() {
    return Template.instance().state.get('highscores');
  },

  currentSkill() {
    return {
      type: Template.instance().state.get('selectedSkill')
    };
  }
});
