import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';

import './skills.html';

Template.skillsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('selectedSkill', 'total');

  // Fetch active users count
  Meteor.call('users.activeUsers', (err, res) => {
    this.state.set('activeUsers', res);
  });

  this.autorun(() => {
    const skillName = this.state.get('selectedSkill');
    if (skillName === 'tower') {
      Meteor.call('battles.currentFloorHighscores', (err, res) => {
        this.state.set('highscores', res.map((highscore, index) => {
          highscore.rank = index + 1;
          highscore.points = highscore.points.toFixed(2);
          return highscore;
        }));
      });
    } else {
      Meteor.call('skills.highscores', skillName, (err, res) => {
        res.forEach((item, index) => {
          item.rank = index + 1;
        });
        this.state.set('highscores', res);
      });     
    }
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
      { type: 'inscription' },
      { type: 'crafting' },
      { type: 'woodcutting' },
      { type: 'health' }
    ];
  },

  activeUsers() {
    return Template.instance().state.get('activeUsers');
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
