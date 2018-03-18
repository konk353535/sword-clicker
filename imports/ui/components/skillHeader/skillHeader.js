import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '/imports/api/items/items.js';
import { State } from '/imports/api/state/state';
import { STATE_BUFFS } from '/imports/constants/state';
import lodash from 'lodash';

import './skillHeader.html';

Template.skillHeader.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('currentXp');
  this.state.set('currentLevel');

  Tracker.autorun(() => {
    let globalBuffs = State.find({name: {$in: Object.values(STATE_BUFFS)}, 'value.activeTo': {$gte: moment().toDate()}}).fetch();
    globalBuffs = lodash.fromPairs(globalBuffs.map((buff) => [buff.name, buff.value.activeTo]));
    this.state.set('globalBuffs', globalBuffs);
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
})
