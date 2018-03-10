import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Items } from '/imports/api/items/items.js';
import { Abilities } from '/imports/api/abilities/abilities.js';
import { Combat } from '/imports/api/combat/combat.js';

import { PLAYER_ICONS } from '/imports/constants/shop/index.js';

import './loadout.html';

Template.loadoutPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

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
  });
});

Template.loadoutPage.events({
  'click .continue-btn'(event, instance) {
    instance.data.setPage('lobby');
  },

  'click .edit-gear-btn'(event, instance) {
    instance.data.setPage('selectGear');
  }
})

Template.loadoutPage.helpers({
  equippedItemsMap() {
    const equippedItems = Items.find({
      category: 'combat',
      equipped: true
    }).map((item) => {
      item.hideCount = true;
      item.primaryAction = {
        description: 'unequip',
        item,
        method() {
          Meteor.call('items.unequip', this.item._id, this.item.itemId);
        }
      }
      return item;
    });

    const equippedMap = {};
    equippedItems.forEach((item) => {
      equippedMap[item.slot] = item;
    });

    return equippedMap;
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

  skinsLibrary() {
    const myCombat = Combat.findOne({
      owner: Meteor.userId()
    });

    if (!myCombat) {
      return [];
    }

    const availableIcons = ['mage_t1', 'tank_t1', 'damage_t1'].concat(myCombat.boughtIcons);

    return Object.keys(PLAYER_ICONS).map((key) => {
      let disabled = true;
      let selected = false;
      if (_.contains(availableIcons, key)) {
        disabled = false
      }

      if (myCombat.characterIcon === PLAYER_ICONS[key].icon) {
        selected = true;
      }

      return Object.assign({}, PLAYER_ICONS[key], {
        selected,
        disabled,
        id: key
      });
    });
  }
});

Template.skinLibraryIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.skinLibraryIcon.events({
  'click'(event, instance) {
    Meteor.call('combat.updateCharacterIcon', instance.data.skin.id, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  }
});

Template.skinLibraryIcon.rendered = function () {
  const buffTooltip = new Drop({
    target: Template.instance().$('.icon-box')[0],
    content: Template.instance().$('.skin-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.skinLibraryIcon.helpers({
  description() {
    // Generate subscription
    let description = 'No requirements to equip this skin';

    const skin = Template.instance().data.skin;
    if (skin.requiredEquip) {
      description = `Requires level ${skin.requiredEquip[0].level} ${skin.requiredEquip[0].name}`;
    }

    return description;
  }
})
