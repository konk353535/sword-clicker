import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import _ from 'underscore';

import { Battles } from '/imports/api/battles/battles.js';
import { Abilities } from '/imports/api/abilities/abilities.js';

import './currentBattleUi.html';

Template.currentBattleUi.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    const currentBattle = Battles.findOne({ finished: false });

    if (currentBattle) {
      if (currentBattle.tickEvents.length > 3) {
        // Only show user owned ticks
        currentBattle.tickEvents = currentBattle.tickEvents.filter((tickEvent) => {
          return tickEvent.from === Meteor.userId() || tickEvent.to === Meteor.userId()
        });
      }
      currentBattle.tickEvents.forEach((tickEvent, tickEventIndex) => {
        const offset = $(`#${tickEvent.to}`).offset();
        let color;
        if (tickEvent.label == 0) {
          color = 'blue';
        } else {
          color = 'red';
        }

        // Determine left based on tick # + tickEventIndex
        offset.left += -20 + ((tickEventIndex % 3) * 45); // -10 to 50

        // Attempt to push floating text down when more then 3
        if (tickEventIndex % 6 >= 3) {
          offset.top += 40;
        }

        let element = `
          <p
            class='floating-text'
            data-count=1
            style='top: ${offset.top}px; left: ${offset.left}px; opacity: 1.0; color: ${color}'>
            <i class="lilIcon-attack"></i>
            ${tickEvent.label}
          </p>
        `;

        $('body').append(element);
      });
    }
  })
});

Template.currentBattleUi.helpers({
  currentBattle() {
    const currentBattle = Battles.findOne({
      finished: false
    });

    if (!currentBattle) {
      return {};
    }

    const myUnit = _.findWhere(currentBattle.units, { id: Meteor.userId() });
    if (myUnit) {
      Template.instance().state.set('myUnit', myUnit);
    }

    return currentBattle;
  },

  unitClicked() {
    const instance = Template.instance();
    return function (unitId) {
      // Current Battle
      const currentBattle = Battles.findOne({
        finished: false
      });

      // Amulet Stats
      const myUnit = instance.state.get('myUnit');

      if (!$('body').hasClass('targetting-enemies')) {
        if (myUnit && myUnit.amulet && myUnit.amulet.energy >= 1) {
          const battleId = currentBattle._id;
          const casterId = Meteor.userId();
          Meteor.call('battles.castAbility', battleId, 'clickAttack', {
            targets: [unitId], caster: casterId
          });
        }
      }
    }
  },

  changeTargetAbility() {
    return {
      id: 'changeTarget',
      icon: 'changeTarget',
      description: 'Select a target to attack',
      name: 'Attack Target',
      currentCooldown: 0,
      targettable: true
    }
  },

  equippedAbilities() {
    const myAbilities = Abilities.findOne();
    if (!myAbilities) {
      return;
    }

    const currentBattle = Battles.findOne({
      finished: false
    });
    if (!currentBattle) {
      return;
    }
    const myUnit = _.findWhere(currentBattle.units, { owner: Meteor.userId() });
    const abilityMap = {};

    myUnit.abilities.forEach((ability) => {
      abilityMap[ability.id] = {
        currentCooldown: ability.currentCooldown,
        id: ability.id
      }
    });

    const equippedAbilities = myAbilities.learntAbilities.filter((ability) => {
      if (abilityMap[ability.abilityId]) {
        ability.currentCooldown = abilityMap[ability.abilityId].currentCooldown;
      }
      return ability.equipped;
    });

    return equippedAbilities;
  },

  myUnitsBuffs() {
    const instance = Template.instance();

    if (instance && instance.state.get('myUnit')) {
      return instance.state.get('myUnit').buffs;
    }
  },

  myUnitsAmulet() {
    const instance = Template.instance();

    if (instance && instance.state.get('myUnit')) {
      return instance.state.get('myUnit').amulet;
    }
  }
});
