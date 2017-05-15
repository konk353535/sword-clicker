import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { determineRequiredItems } from '/imports/ui/utils.js';

import { Abilities } from '/imports/api/abilities/abilities.js';
import { Combat } from '/imports/api/combat/combat.js';
import { Items } from '/imports/api/items/items.js';
import _ from 'underscore';

import './spellBookTab.html';

Template.spellBookTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    const anAbility = Abilities.findOne();
    // Pass ability so when a new abilitiy is learnt this is reactive
    const results = ReactiveMethod.call('abilities.fetchLibrary', anAbility);
    const spellCrafting = ReactiveMethod.call('abilities.fetchSpellCrafting', anAbility);

    this.state.set('spellCrafting', spellCrafting);

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

Template.spellBookTab.events({
  'keyup .craft-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      if (newValue > instance.state.get('maxCraftableAmount')) {
        newValue = instance.state.get('maxCraftableAmount');
      }
      instance.state.set('craftAmount', newValue);
    }
  },

  'submit .craft-amount-form'(event, instance) {
    event.preventDefault();

    const abilityId = instance.state.get('multiCraftAbilityId');
    const amountToCraft = instance.state.get('craftAmount');
    
    const spellCrafting = instance.state.get('spellCrafting');
    const spellConstants = _.findWhere(spellCrafting, { abilityId });

    instance.$('.multiCraftModal').modal('hide');
    Meteor.call('abilities.craftSpell', abilityId, amountToCraft, (err) => {
      if (err) {
        toastr.warning('Failed to craft item');
      } else {
        toastr.success(`Crafted ${spellConstants.name}`)
      }
    });
  },

  'click .craft-btn'(event, instance) {
    const abilityId = instance.state.get('multiCraftAbilityId');
    const amountToCraft = parseInt($(event.target).closest('.craft-btn')[0].getAttribute('data-amount'));
    
    const spellCrafting = instance.state.get('spellCrafting');
    const spellConstants = _.findWhere(spellCrafting, { abilityId });
    instance.$('.multiCraftModal').modal('hide');

    Meteor.call('abilities.craftSpell', abilityId, amountToCraft, (err) => {
      if (err) {
        toastr.warning('Failed to craft item');
      } else {
        toastr.success(`Crafting ${spellConstants.name}`)
      }
    });
  },

  'click .craft-spell'(event, instance) {
    const abilityId = $(event.target).closest('.craft-spell')[0].getAttribute('data-spell');
    const spellCrafting = instance.state.get('spellCrafting');

    const spellConstants = _.findWhere(spellCrafting, { abilityId });

    let { maxCraftable, notMet } = determineRequiredItems(spellConstants);

    if (notMet) {
      return toastr.warning('Not enough resources to craft');
    }

    if (spellConstants.maxToCraft > 1) {
      instance.state.set('maxCraftableAmount', maxCraftable);
      instance.state.set('maxCraftAmount', 10000);
      instance.state.set('craftAmount', Math.ceil(maxCraftable / 2));
      instance.state.set('multiCraftAbilityId', abilityId);
      instance.$('.multiCraftModal').modal('show');
      instance.$('.craft-amount-input').focus();
    }
  },
})

Template.spellBookTab.helpers({

  availableTomes() {
    return Items.find({ category: 'magicTome' }).map((item) => {
      item.primaryAction = {
        description: 'learn',
        item,
        method() {
          Meteor.call('abilities.learn', this.item._id, this.item.itemId, (err, res) => {
            if (err) {
              toastr.warning(err.reason);
            } else {
              toastr.success(`Successfully learnt ${item.name}`)
            }
          });
        }
      }
      return item;
    });
  },

  equippedAbilitiesMap() {
    const myAbilities = Abilities.findOne();
    if (!myAbilities) {
      return;
    }

    const equippedAbilities = myAbilities.learntAbilities.filter((ability) => {
      // To do add unequipping for abilities
      ability.primaryAction = {
        description: 'unequip',
        ability,
        method() {
          Meteor.call('abilities.unequip', this.ability.slot);
        }
      };

      return ability.equipped;
    });

    const equippedMap = {};
    equippedAbilities.forEach((item) => {
      equippedMap[item.slot] = item;
    });

    return equippedMap;
  },

  spellCrafting() {
    const instance = Template.instance();
    return instance.state.get('spellCrafting');
  },

  abilityLibrary() {
    const instance = Template.instance();
    const myAbilities = Abilities.findOne({});

    if (!instance.state.get('abilityLibrary') || !myAbilities) {
      return [];
    }

    return instance.state.get('abilityLibrary').map((ability) => {
      ability.primaryAction = {};

      const targetAbility = _.findWhere(myAbilities.learntAbilities, { abilityId: ability.id }); 
      if (targetAbility) {
        ability.notLearnt = false;
        ability.isSpell = targetAbility.isSpell;
        ability.casts = targetAbility.casts;
        ability.primaryAction = {
          description: 'equip',
          ability,
          method() {
            Meteor.call('abilities.equip', this.ability.id);
          }
        }
      } else {
        ability.notLearnt = true;
      }

      return ability;
    }).filter((ability) => {
      return ability.isSpell;
    });
  },

  maxCraftAmount() {
    return Template.instance().state.get('maxCraftAmount');
  },

  craftAmount() {
    return Template.instance().state.get('craftAmount');
  },

  maxCraftableAmount() {
    return Template.instance().state.get('maxCraftableAmount');
  },
})
