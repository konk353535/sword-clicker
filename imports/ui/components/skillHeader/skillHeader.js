import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '/imports/api/items/items.js';
import { State } from '/imports/api/state/state';
import { STATE_BUFFS } from '/imports/constants/state';
import lodash from 'lodash';

import { getGlobalBuffs } from '/imports/api/globalbuffs/globalbuffs';

import './skillHeader.html';

Template.skillHeader.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('currentXp');
  this.state.set('currentLevel');
});

Template.skillHeader.helpers({
  
  allGlobalBuffs() {
    return getGlobalBuffs();
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
