import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import io from 'socket.io-client';

import lodash from 'lodash';
import _ from 'underscore';

import { BattlesList } from '/imports/api/battles/battles.js';
import { Abilities } from '/imports/api/abilities/abilities.js';
import { Groups } from '/imports/api/groups/groups.js';

import './currentBattleUi.html';

const startBattle = (currentBattle, self) => {
  let myUnit;

  if (currentBattle.unitsMap) {
    myUnit = currentBattle.unitsMap[Meteor.userId()];
  } else {
    myUnit = _.findWhere(currentBattle.units, { id: Meteor.userId() });
  }
  if (myUnit) {
    self.state.set('myUnit', myUnit);
  }

  // Find enemies that are targetting my unit
  currentBattle.enemies.forEach((enemy) => {
    enemy.targettingPlayer = !!(myUnit && enemy.target === myUnit.id);
  });

  // Find enemies that i'm targetting
  currentBattle.enemies.forEach((enemy) => {
    enemy.myTarget = !!(myUnit && myUnit.target === enemy.id);
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

          if (tickEvent.label === 0) {
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
};

window.isReconnecting = false;
function reconnectBattleSocket(localBalancer, currentBattleList, user) {
  if (window.isReconnecting) {
    return;
  }
  
  // block parallel reconnections
  window.isReconnecting = true;
  
  // debugging
  /* console.log("Creating new battleSocket from currentBattleUi");  
  if (!window.battleSocket) {
    console.log("--- no window.battleSocket at all");
  } else if (localBalancer !== window.balancer && !currentBattleList) {
    console.log("--- just need a new balancer (group vs. user ID)");
  } */
  
  // be kind and close any existing battleSocket
  if (window.battleSocket) {
    try {
      //console.log("--- closing existing battleSocket")
      window.battleSocket.close();
      //console.log("------ success!");
    } catch (err) {
      //console.log("------ error!");
      //console.log(err);
    }
  }
  
  // swap to new balancer (ID is player user ID for solo or their associated group ID)
  window.balancer = localBalancer;
  
  // for convenience, pass along user ID and user name
  let extraUri = '';
  try {
    extraUri += `&userId=${user.id}`;
    extraUri += `&userName=${user.name}`;
  } catch (err) {
  }
  
  // connect to the balancer and request a battle node server transport for our balancer ID
  $.ajax({
    url: `${Meteor.settings.public.battleUrl}/balancer/${window.balancer}?balancer=${window.balancer}${extraUri}`
  }).done(function() {
    // when connected to the balancer, open a new socket to the proxied battle node transport -- this is our new battleSocket
    window.battleSocket = io(`${Meteor.settings.public.battleUrl}/${window.balancer}?balancer=${window.balancer}${extraUri}`, {
      transports: ['websocket'],
      forceNew: true
    });
    
    // trigger an event when we disconnect from the battleSocket (cleanup)
    window.battleSocket.on('disconnect', () => {
      window.battleSocket = undefined;
      window.balancer = undefined;
    });
    
    // stop blocking reconnect
    window.isReconnecting = false;
  });
}

let tickerId;
Template.currentBattleUi.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('loading', true);
  this.state.set('currentBattle', false);
  this.state.set('onTick', false);
  this.state.set('fullState', false);
  this.state.set('ticker', 0);

  // Todo, clean this up after leaving it
  tickerId = setInterval(() => {
    if (!this.state.get('currentBattle')) {
      // Attempts to fix an issue where u don't get initial state so see a blank battle until next battle
      battleSocket.emit('getFullState');
      this.state.set('ticker', this.state.get('ticker') + 1);
    }

    if (this.state.get('ticker') > 10) {
      this.state.set('loading', false);
    }
  }, 2500);

  Tracker.autorun(() => {
    //console.log(this.state.get('ticker')); // konk left this debug in, disabling it for now (psouza4: 2018-10-30)
    
    // Lots of hacks follow, I'm so sorry
    const currentBattleList = BattlesList.findOne({
      owners: Meteor.userId()
    });

    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    if (!currentBattleList) {
      this.state.set('currentBattle', false);
      return;
    }

    let localBalancer = Meteor.userId();
    if (currentGroup) {
      localBalancer = currentGroup.balancer;
    }

    if (!window.battleSocket || localBalancer !== window.balancer) {
      let userData = {};
      try {
        let userId = Meteor.userId();
        if (userId) {
          userId = userId.toString();
        } else {
          userId = Meteor.userId;
        }
        let foundUser = Users.findOne({ _id: userId });
        if (foundUser) {
          extraUri += `&userName=${foundUser.username}`;
        }
        if (foundUser && foundUser.username) {
          userData.id = userId;
          userData.name = foundUser.username;
        }
      } catch (err) {
      }

      reconnectBattleSocket(localBalancer, currentBattleList, userData);
    }

    if (!this.state.get('fullState')) {
      this.state.set('fullState', true);
      battleSocket.on('fullState', (data) => {
        const rawBattle = data.battle;
        if (!rawBattle) return;
        const currentBattle = rawBattle;
        if (!currentBattle) return;

        startBattle(currentBattle, this);
      });
    }

    if (!this.state.get('onTick')) {
      this.state.set('onTick', true);
      battleSocket.on('tick', (data) => {
        const { tickEvents, deltaEvents } = data;
        const currentBattle = this.state.get('currentBattle');
        if (!currentBattle) return;
        currentBattle.tickEvents = tickEvents;
        currentBattle.unitsMap = {};
        currentBattle.units.concat(currentBattle.enemies, currentBattle.deadEnemies, currentBattle.deadUnits).forEach((unit) => {
          if (unit) {
            currentBattle.unitsMap[unit.id] = unit;
            if (unit.abilities) {
              unit.abilitiesMap = {};
              unit.abilities.forEach((ability) => {
                unit.abilitiesMap[ability.id] = ability;
              });
            }
            if (unit.buffs) {
              unit.buffsMap = {};
              unit.buffs.forEach((buff) => {
                unit.buffsMap[buff.id] = buff;
              });
            }
          }
        });

        deltaEvents.forEach(({ type, path, value }) => {
          if (type === 'abs') {
            lodash.set(currentBattle, path, value);
          } else if (type === 'push') {
            const arrayToMutate = lodash.get(currentBattle, path);
            if (arrayToMutate) {
              arrayToMutate.push(value);
            }
          } else if (type === 'pop') {
            const arrayToMutate = lodash.get(currentBattle, path);
            if (arrayToMutate) {
              lodash.set(currentBattle, path, arrayToMutate.filter((unit) => {
                return unit.id !== value;
              }));
            }
          } else if (type === 'splice') {
            const arrayToMutate = lodash.get(currentBattle, path);
            if (arrayToMutate) {
              arrayToMutate.splice(value, 1);
            }
          }
        });

        startBattle(currentBattle, this);
      });

      battleSocket.emit('getFullState')
    }
  });
});

Template.currentBattleUi.onDestroyed(function () {
  battleSocket.removeListener('tick');
  battleSocket.removeListener('fullState');
  clearInterval(tickerId);
})

Template.currentBattleUi.events({
  'click .forfeit-battle'(event, instance) {
    // Mark battle as stale.
    Meteor.call('battles.killBattle', Meteor.userId());
  }
})

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
        if (
          (myUnit && myUnit.amulet && myUnit.amulet.energy >= 1) ||
          (myUnit.target !== unitId)
        ) {
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
    };

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
