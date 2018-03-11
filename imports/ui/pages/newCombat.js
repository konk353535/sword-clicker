import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Items } from '/imports/api/items/items.js';
import { Abilities } from '/imports/api/abilities/abilities.js';
import { Combat } from '/imports/api/combat/combat.js';

import { PLAYER_ICONS } from '/imports/constants/shop/index.js';

import '../components/newCombat/loadout/loadout.js';
import '../components/newCombat/recentBattles/recentBattles.js';
import '../components/newCombat/selectGear/selectGear.js';
import '../components/newCombat/selectAbilities/selectAbilities.js';
import '../components/newCombat/lobby/lobby.js';
import './newCombat.html';

Template.newCombatPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.state.set('page', 'lobby');
});

Template.newCombatPage.events({
})

Template.newCombatPage.helpers({
  page() {
    return Template.instance().state.get('page');
  },

  setPage() {
    const instance = Template.instance();
    return (page) => {
      instance.state.set('page', page);      
    }
  }
});
