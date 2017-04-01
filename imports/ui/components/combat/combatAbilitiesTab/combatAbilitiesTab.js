import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Abilities } from '/imports/api/abilities/abilities.js';
import { Items } from '/imports/api/items/items.js';

import './combatAbilitiesTab.html';

Template.combatAbilitiesTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.subscribe('abilities');

  this.autorun(() => {
    const anAbility = Abilities.findOne();
    // Pass ability so when a new abilitiy is learnt this is reactive
    const results = ReactiveMethod.call('abilities.fetchLibrary', anAbility);
    if (results) {
      const resultsMap = {};
      results.forEach((result) => {
        resultsMap[result.id] = result;
      });
      this.state.set('abilityLibraryListMap', resultsMap);

      // Store recipes
      this.state.set('abilityLibrary', results);
    }
  })
});

Template.combatAbilitiesTab.events({
})

Template.combatAbilitiesTab.helpers({

  availableTomes() {
    return Items.find({ category: 'tome' }).map((item) => {
      item.primaryAction = {
        description: 'learn',
        item,
        method() {
          Meteor.call('abilities.learn', this.item._id, this.item.itemId);
        }
      }
      return item;
    });
  },

  abilityLibrary() {
    const instance = Template.instance();

    if (!instance.state.get('abilityLibrary')) {
      return [];
    }

    console.log(instance.state.get('abilityLibrary'));

    return instance.state.get('abilityLibrary').map((ability) => {
      ability.notLearnt = true;
      // Show equip if we have learnt this
      ability.primaryAction = {}
      /*
        description: 'unequip',
        item,
        method() {
          Meteor.call('items.unequip', this.item._id, this.item.itemId);
        }
      */
      return ability;
    });
  }
})
