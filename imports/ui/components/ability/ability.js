import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './ability.html';

Template.ability.events({
  'click'(event, instance) {
    if (instance.data.ability.targettable) {
      if (!$('body').hasClass('targetting-enemies')) {
        $('body').addClass('targetting-enemies');
        Meteor.setTimeout(() => {
          // Add body listener for when you want to click out
          $('body').on(`click.${instance.data.ability.id}`, function (event) {
            if ($(event.target).hasClass('enemy-icon')) {
              const targetId = $(event.target).data('unit-id');
              const battleId = instance.data.battleId;
              const abilityId = instance.data.ability.id;
              // Fire this ability from = us, to = 
              Meteor.call('battles.castAbility', battleId, abilityId, {
                target: targetId, caster: Meteor.userId()
              });
            }
            
            $('body').removeClass('targetting-enemies');
            $('body').off(`click.${instance.data.ability.id}`);
          });
        }, 1);
      }
    } else {
      const battleId = instance.data.battleId;
      const abilityId = instance.data.ability.id;
      const targetId = Meteor.userId();
      const casterId = Meteor.userId();
      Meteor.call('battles.castAbility', battleId, abilityId, {
        targets: [targetId], caster: casterId
      });
    }
  }
})

Template.ability.helpers({

});
