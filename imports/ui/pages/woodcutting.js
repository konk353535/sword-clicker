import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Woodcutting } from '/imports/api/woodcutting/woodcutting.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

import './woodcutting.html';

let woodcuttingPageTimer;

Template.woodcuttingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('hasLearnRequirements', false);

  // Show woodcutting
  Meteor.subscribe('woodcutting');

  woodcuttingPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('woodcutting.gameUpdate');
    }
  }, 10000);

  Meteor.call('woodcutting.gameUpdate', (err, res) => {
    this.autorun(() => {
      // Only called when skills have loaded
      if (Skills.findOne()) {
        const woodcuttingSkill = Skills.findOne({ type: 'woodcutting' });

        if (!woodcuttingSkill) {
          Meteor.call('skills.requirements', 'woodcutting', (err, res) => {
            this.state.set('learnRequirements', res);
          });
        }
      }
    });
  });
});

Template.woodcuttingPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(woodcuttingPageTimer);
});

Template.woodcuttingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'woodcutting');
  },

  'click .buy-woodcutter'(event, instance) {
    Template.instance().$('.woodcuttersModal').modal('show');      
  },

  'click .confirm-fire-btn'(event, instance) {
    Meteor.call('woodcutting.fireWoodcutter', instance.state.get('firingWoodcutterIndex'));
    instance.$('.fireModal').modal('hide');
  },

  'click .craft-row'(event, instance) {
    const woodcutterId = instance.$(event.target).closest('.craft-row').data('recipe');

    Meteor.call('woodcutting.hireWoodcutter', woodcutterId);
  },
});

Template.woodcuttingPage.helpers({
  woodcuttingSkill() {
    return Skills.findOne({ type: 'woodcutting' });
  },

  woodcutting() {
    const woodcutting = Woodcutting.findOne();
    const instance = Template.instance();
    if (!woodcutting) {
      return;
    }

    const userDoc = Meteor.user();
    const hasMiningUpgrade = userDoc.woodcuttingUpgradeTo && moment().isBefore(userDoc.woodcuttingUpgradeTo);

    woodcutting.woodcutters.forEach((woodcutter, woodcutterIndex) => {
      if (!/.png/.test(woodcutter.icon) && !/.svg/.test(woodcutter.icon)) {
        woodcutter.icon += '.svg';
      }
      // Incoming hacks!
      woodcutter.description = `
        <div class="d-flex align-items-center">
          <i class="lilIcon-attack extra-small-icon mr-1"></i>
          ${woodcutter.stats.attack}
        </div>
        <div class="d-flex align-items-center">
          <i class="lilIcon-attackSpeed extra-small-icon mr-1"></i>
          ${woodcutter.stats.attackSpeed}
        </div>
      `;

      // Append to description based on if the user is currently a member
      if (hasMiningUpgrade) {
        let computedBonus = Math.floor(20 + ((DONATORS_BENEFITS.woodcuttingBonus / 100) * woodcutter.stats.accuracy));
        woodcutter.description += `
          <div class="d-flex align-items-center">
            <i class="lilIcon-accuracy extra-small-icon mr-1"></i>
            ${woodcutter.stats.accuracy}&nbsp;+&nbsp;
            <span class='text-primary'>${computedBonus}</span>
          </div>
        `
      } else {
        woodcutter.description += `
          <div class="d-flex align-items-center">
            <i class="lilIcon-accuracy extra-small-icon mr-1"></i>
            ${woodcutter.stats.accuracy}
          </div>
        `
      }

      woodcutter.hideStats = true;

      woodcutter.primaryAction = {
        description: 'activate Suicidal Fury',
        method() {
          instance.state.set('firingWoodcutterIndex', woodcutterIndex);
          instance.$('.fireModal').modal('show');
        }
      }
    });
    return woodcutting;
  },

  learnRequirements() {
    return Template.instance().state.get('learnRequirements');
  },

  hasLearnRequirements() {
    return Template.instance().state.get('hasLearnRequirements');
  },

  learnRequirementsMet() {
    const instance = Template.instance();
    return function (met) {
      instance.state.set('hasLearnRequirements', met);
    }
  },

  woodcutterStatContent() {
    return `
      <p>
        <div class="d-flex align-items-center">
          <i class="lilIcon-attack extra-small-icon mr-1"></i><b>Attack</b>
        </div>
        Determines the best wood a woodcutter can get.
      </p>
      <p>
        <div class="d-flex align-items-center">
          <i class="lilIcon-attackSpeed extra-small-icon mr-1"></i><b>Speed</b>
        </div>
        How many times a minute the woodcutter will chop wood.
      </p>
      <p>
        <div class="d-flex align-items-center">
          <i class="lilIcon-accuracy extra-small-icon mr-1"></i><b>Accuracy</b>
        </div>
        Accuracy increases the chance of getting rarer logs. <br />
        As well as getting more basic logs.
      </p>
    `;
  },

  buyableWoodcutters() {
    const woodcuttingSkill = Skills.findOne({ type: 'woodcutting' });
    if (!woodcuttingSkill) {
      return;
    }
    // Pass level so that this is recalled when we get up a level
    const results = ReactiveMethod.call('woodcutting.fetchWoodcutters', woodcuttingSkill.level);

    return results || [];
  },

  items() {
    return Items.find({ category: 'woodcutting' }, {
      sort: {
        quality: -1
      }
    });
  }
});
