import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';
import _ from 'underscore';

import { PLAYER_ICONS } from '/imports/constants/shop/index.js';
import { Combat } from '/imports/api/combat/combat.js';

import './skinTab.html';

Template.skinTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
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
};

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
});

Template.skinTab.events({
});

Template.skinTab.helpers({
  skinsLibrary() {
    const myCombat = Combat.findOne({
      owner: Meteor.userId()
    });

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
