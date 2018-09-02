import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './skillHeader.html';

Template.skillHeader.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('currentXp');
  this.state.set('currentLevel');

  Meteor.call('shop.fetchGlobalBuffs', (err, res) => {
    this.state.set('globalBuffs', res);
  });
});

Template.skillHeader.helpers({

  globalBuffs() {
    const instance = Template.instance();
    const type = instance.data.skill.type;
    if (type === 'magic' || type === 'defense' || type === 'attack' || type === 'health') {
      return false;
    }

    return Template.instance().state.get('globalBuffs');
  },

  xpPercentage() {
    const instance = Template.instance();
    if (instance.data.skill) {

      // Set initial value
      instance.state.set('currentXp', instance.data.skill.xp);
      instance.state.set('currentLevel', instance.data.skill.level);

      return (instance.data.skill.xp / instance.data.skill.xpToLevel) * 100;
    } else {
      return 0;
    }
  }
});
