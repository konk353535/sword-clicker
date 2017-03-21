import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';

import './skills.html';

Template.skillsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('selectedSkill', 'mining');

  this.autorun(() => {
    const skillName = this.state.get('selectedSkill');
    Meteor.call('skills.highscores', skillName, (err, res) => {
      this.state.set('highscores', res);
    });
  });
});

Template.skillsPage.events({});

Template.skillsPage.helpers({
  skills() {
    return Skills.find({}).map((skill) => {
      skill.percentage = Math.round((skill.xp / skill.xpToLevel) * 100);
      return skill;
    });
  },

  highscores() {
    return Template.instance().state.get('highscores');
  },

  currentSkill() {
    return Skills.find({
      type: Template.instance().state.get('selectedSkill')
    });
  }
});
