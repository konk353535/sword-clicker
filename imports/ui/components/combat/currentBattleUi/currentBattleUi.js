import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import io from 'socket.io-client';

import lodash from 'lodash';
import _ from 'underscore';

import { Battles, BattlesList } from '/imports/api/battles/battles.js';
import { Abilities } from '/imports/api/abilities/abilities.js';

import './currentBattleUi.html';

const redis = new Meteor.RedisCollection('redis');

const startBattle = (currentBattle, self) => {
  const myUnit = _.findWhere(currentBattle.units, { id: Meteor.userId() });
  if (myUnit) {
    self.state.set('myUnit', myUnit);
  }

  // Find enemies that are targetting my unit
  currentBattle.enemies.forEach((enemy) => {
    if (myUnit && enemy.target === myUnit.id) {
      enemy.targettingPlayer = true;
    } else {
      enemy.targettingPlayer = false;
    }

    enemy.myTarget = myUnit.target === enemy.id;
  });

  self.state.set('currentBattle', currentBattle);

  if (currentBattle) {
    if (currentBattle.tickEvents.length > 3) {
      // Only show user owned ticks
      currentBattle.tickEvents = currentBattle.tickEvents.filter((tickEvent) => {
        return tickEvent.from === Meteor.userId() || tickEvent.to === Meteor.userId()
      });
    }
    if (!Session.get('floatingTextDisabled')) {
      currentBattle.tickEvents.forEach((tickEvent, tickEventIndex) => {
        const offset = $(`#${tickEvent.to}`).offset();
        if (offset) {
          let color;
          let fontSize = 'asdf';

          if (tickEvent.label == 0) {
            color = 'blue';
            fontSize = '10px';
          } else if (tickEvent.customColor) {
            color = tickEvent.customColor;
          } else {
            color = 'red';
          }

          // Determine left based on tick # + tickEventIndex
          offset.left += -20 + ((tickEventIndex % 3) * 45); // -10 to 50

          // Attempt to push floating text down when more then 3
          if (tickEventIndex % 6 >= 3) {
            offset.top += 40;
          }

          let element = $(`
            <p
              class='floating-text'
              data-count=1
              style='top: ${offset.top}px; left: ${offset.left}px; font-size: ${fontSize}; opacity: 1.0; color: ${color}'>
              <i class="lilIcon-${tickEvent.customIcon ? tickEvent.customIcon : 'attack'}"></i>
              ${tickEvent.label}
            </p>
          `);

          $('body').append(element);
          $(element).animateCss('fadeOutUp');
        }
      });
    }
  }
}

Template.currentBattleUi.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Tracker.autorun(() => {
    // Lots of hacks follow, I'm so sorry
    const currentBattleList = BattlesList.findOne({
      owners: Meteor.userId()
    });

    if (!currentBattleList) return;

    window.battleSocket = io(`http://localhost:3055/${currentBattleList._id}`, {
      transports: ['websocket']
    });

    battleSocket.emit('getFullState');

    battleSocket.on('fullState', (data) => {
      const rawBattle = data.battle;
      if (!rawBattle) return;
      const currentBattle = rawBattle;
      if (!currentBattle) return;

      startBattle(currentBattle, this);
    });

    battleSocket.on('tick', (data) => {
      const { tickEvents, deltaEvents } = data;
      const currentBattle = this.state.get('currentBattle');
      if (!currentBattle) return;
      const alteredBattle = Object.assign(currentBattle, { tickEvents });
      alteredBattle.unitsMap = {};
      alteredBattle.units.concat(alteredBattle.enemies, alteredBattle.deadEnemies, alteredBattle.deadUnits).forEach((unit) => {
        if (unit) {
          alteredBattle.unitsMap[unit.id] = unit;
          if (unit.abilities) {
            unit.abilitiesMap = {};
            unit.abilities.forEach((ability) => {
              unit.abilitiesMap[ability.id] = ability;
            });
          }
        }
      });
      deltaEvents.forEach(({ type, path, value }) => {
        if (type === 'abs') {
          lodash.set(alteredBattle, path, value);
        } else if (type === 'push') {
          lodash.get(alteredBattle, path).push(value);          
        } else if (type === 'pop') {
          const arrayToMutate = lodash.get(alteredBattle, path);
          lodash.set(alteredBattle, path, arrayToMutate.filter((unit) => {
            return unit.id !== value
          }));
        }
      });
      startBattle(alteredBattle, this);
    });
  })
});

Template.currentBattleUi.helpers({
  currentBattle() {
    const currentBattle = Template.instance().state.get('currentBattle');

    if (!currentBattle) {
      return {};
    }

    return currentBattle;
  },

  unitClicked() {
    const instance = Template.instance();
    return function (unitId) {
      // Current Battle
      const currentBattle = instance.state.get('currentBattle');

      // Amulet Stats
      const myUnit = instance.state.get('myUnit');

      if (!$('body').hasClass('targetting-enemies')) {
        if (myUnit && myUnit.amulet && myUnit.amulet.energy >= 1) {
          const battleId = currentBattle._id;
          const casterId = Meteor.userId();

          if (battleSocket) {
            // Gonna require the socket here
            battleSocket.emit('action', {
              battleSecret: Meteor.user().battleSecret,
              abilityId: 'clickAttack',
              targets: [unitId],
              caster: Meteor.userId()
            });                
          }
        }
      }
    }
  },

  changeTargetAbility() {
    return {
      id: 'changeTarget',
      icon: 'changeTarget.svg',
      description: 'Select a target to attack',
      name: 'Attack Target',
      slot: 'changeTarget',
      hotkey: 't',
      target: 'singleEnemy',
      currentCooldown: 0,
      targettable: true
    }
  },

  equippedAbilities() {
    const myAbilities = Abilities.findOne();
    if (!myAbilities) {
      return;
    }

    const abilityIndexes = {
      'mainHand': 0,
      'offHand': 1,
      'head': 2,
      'chest': 3,
      'legs': 4
    }

    const currentBattle = Template.instance().state.get('currentBattle');

    if (!currentBattle) {
      return;
    }
    const myUnit = _.findWhere(currentBattle.units, { owner: Meteor.userId() });
    const abilityMap = {};

    if (myUnit) {
      myUnit.abilities.forEach((ability) => {
        abilityMap[ability.id] = {
          currentCooldown: ability.currentCooldown,
          casts: ability.casts,
          id: ability.id
        }
      });
    }

    const equippedAbilities = myAbilities.learntAbilities.map((ability) => {
      ability.index = abilityIndexes[ability.slot];
      ability.hotkey = ability.index + 1;
      return ability;
    }).filter((ability) => {
      if (abilityMap[ability.abilityId]) {
        ability.currentCooldown = abilityMap[ability.abilityId].currentCooldown;
        ability.casts = abilityMap[ability.abilityId].casts;
      }
      return ability.equipped;
    });

    return _.sortBy(equippedAbilities, 'index');
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
