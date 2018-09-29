import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { BattlesList } from '/imports/api/battles/battles.js';

import './ability.html';

const castAbility = function(instance) {
  const currentBattleId = BattlesList.findOne({})._id;

  if (instance.data.ability.targettable) {
    if (instance.data.ability.target === 'singleEnemy') {
      const body = $('body');
      if (!body.hasClass('targetting-enemies')) {
        body.addClass('targetting-enemies');
        Meteor.setTimeout(() => {
          // Add body listener for when you want to click out
          body.on(`click.${instance.data.ability.id}`, function (event) {
            if ($(event.target).hasClass('enemy-icon')) {
              const targetId = $(event.target).attr('data-unit-id');
              const battleId = currentBattleId;
              const abilityId = instance.data.ability.id;

              if (battleSocket) {
                // Gonna require the socket here
                battleSocket.emit('action', {
                  battleSecret: Meteor.user().battleSecret,
                  abilityId,
                  targets: [targetId],
                  caster: Meteor.userId()
                });                
              }
            }

            body.removeClass('targetting-enemies');
            body.off(`click.${instance.data.ability.id}`);
          });
        }, 1);
      }
    } else if (instance.data.ability.target === 'singleFriendly') {
      const body = $('body'); 
      if (!body.hasClass('targetting-friendlies')) {
        body.addClass('targetting-friendlies');
        Meteor.setTimeout(() => {
          // Add body listener for when you want to click out
          body.on(`click.${instance.data.ability.id}`, function (event) {
            if ($(event.target).hasClass('friendly-icon')) {
              const targetId = $(event.target).attr('data-unit-id');
              const battleId = currentBattleId;
              const abilityId = instance.data.ability.id;

              if (battleSocket) {
                // Gonna require the socket here
                battleSocket.emit('action', {
                  battleSecret: Meteor.user().battleSecret,
                  abilityId,
                  targets: [targetId],
                  caster: Meteor.userId()
                });                
              }
            }

            body.removeClass('targetting-friendlies');
            body.off(`click.${instance.data.ability.id}`);
          });
        }, 1);
      }
    }
  } else {
    const battleId = currentBattleId;
    const abilityId = instance.data.ability.id;
    const targetId = Meteor.userId();
    const casterId = Meteor.userId();

    if (battleSocket) {
      // Gonna require the socket here
      battleSocket.emit('action', {
        battleSecret: Meteor.user().battleSecret,
        abilityId,
        targets: [targetId],
        caster: Meteor.userId()
      });                
    }
  }
};

Template.ability.onCreated(function bodyOnCreated() {

});

Template.ability.rendered = function () {
  const slot = this.data.ability.slot;

  $(document).off(`keyup.${slot}`);

  // Map slot to button press
  const keyCodes = {
    'mainHand': 0,
    'offHand': 1,
    'head': 2,
    'chest': 3,
    'legs': 4,
    'changeTarget': 35 // t
  };
  $(document).on(`keyup.${slot}`, (e) => {
    if (keyCodes[slot] != null && e.which === 49 + keyCodes[slot]) {
      castAbility(this);
    }
  });
};

Template.ability.events({
  'click'(event, instance) {
    castAbility(instance);
  }
});

Template.ability.onDestroyed(function onAbilityDestroyed() {
  const slot = this.data.ability.slot;
  $(document).off(`keyup.${slot}`);
});

Template.ability.helpers({

});
