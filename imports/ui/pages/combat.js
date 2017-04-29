import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Combat } from '/imports/api/combat/combat.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Battles } from '/imports/api/battles/battles.js';
import { Groups } from '/imports/api/groups/groups.js';
import { Users } from '/imports/api/users/users.js';

// Component used in the template
import '/imports/ui/components/combat/buffIcon/buffIcon.js';
import '/imports/ui/components/combat/combatAbilitiesTab/combatAbilitiesTab.js';
import '/imports/ui/components/combat/currentBattleUi/currentBattleUi.js';
import '/imports/ui/components/combat/towerTab/towerTab.js';
import '/imports/ui/components/combat/equipmentTab/equipmentTab.js';
import '/imports/ui/components/combat/combatGroupTab/combatGroupTab.js';
import '/imports/ui/components/combat/personalQuestTab/personalQuestTab.js';

import './combat.html';

let combatPageTimer;

Template.combatPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  combatPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('combat.gameUpdate');
    }
  }, 5000);

  this.state.set('hasLearnRequirements', false);

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.combatTab !== undefined) {
        this.state.set('currentTab', myUser.uiState.combatTab);
      } else {
        this.state.set('currentTab', 'equipment');
      }
    }
  });

  Meteor.subscribe('groups');
  Meteor.subscribe('combat');
  Meteor.subscribe('battles');
  Meteor.subscribe('abilities');

  this.autorun(() => {

    const finishedBattle = Battles.findOne({
      finished: true,
      updatedAt: {
        $gte: moment().subtract(10, 'second').toDate()
      }
    }, {
      sort: {
        updatedAt: -1
      }
    });

    if (finishedBattle) {
      finishedBattle.finalTickEvents = finishedBattle.finalTickEvents.filter((tickEvent) => {
        return tickEvent.owner === Meteor.userId();
      });
      this.state.set('finishedBattle', finishedBattle);
      if (this.state.get('waveDetails') && finishedBattle.win) {
        const isBossWin = finishedBattle.difficulty === 'boss';
        const isActiveWaveWin = this.state.get('waveDetails')[`${finishedBattle.difficulty}Waves`] > 0;
        if (isBossWin || isActiveWaveWin) {
          Meteor.call('battles.getWaveDetails', (err, res) => {
            if (res) {
              this.state.set('waveDetails', res.waveDetails);
              this.state.set('maxFloor', res.maxFloor);
            }
          });
        }
      }
    }
  });

  this.autorun(() => {
    // Only called when skills have loaded
    if (Skills.findOne()) {
      const attackSkill = Skills.findOne({ type: 'attack' });
      const defenseSkill = Skills.findOne({ type: 'defense' });
      const healthSkill = Skills.findOne({ type: 'health' });

      if (!attackSkill) {
        Meteor.call('skills.requirements', 'attack', (err, res) => {
          this.state.set('learnRequirements', res);
        });
      }

      if (!defenseSkill) {
        Meteor.call('skills.learnSkill', 'defense');
      }

      if (!healthSkill) {
        Meteor.call('skills.learnSkill', 'health');
      }
    }
  });
});

Template.combatPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(combatPageTimer);
});

Template.combatPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'attack');
  },

  'click .personalQuestTabLink'(event, instance) {
    instance.state.set('currentTab', 'personalQuest');
    Meteor.call('users.setUiState', 'combatTab', 'personalQuest');
  },

  'click .towerTabLink'(event, instance) {
    instance.state.set('currentTab', 'tower');
    Meteor.call('users.setUiState', 'combatTab', 'tower');
  },

  'click .equipmentTabLink'(event, instance) {
    instance.state.set('currentTab', 'equipment');
    Meteor.call('users.setUiState', 'combatTab', 'equipment');
  },

  'click .abilitiesTabLink'(event, instance) {
    instance.state.set('currentTab', 'abilities');
    Meteor.call('users.setUiState', 'combatTab', 'abilities');
  },

  'click .groupTabLink'(event, instance) {
    instance.state.set('currentTab', 'group');
    Meteor.call('users.setUiState', 'combatTab', 'group');
  },

  'click .btn-close-finishedBattle'(event, instance) {
    instance.state.set('finishedBattle', null);
  }
})

Template.combatPage.helpers({
  attackSkill() {
    return Skills.findOne({ type: 'attack' });
  },

  defenseSkill() {
    return Skills.findOne({ type: 'defense' });
  },

  currentGroup() {
    return Groups.findOne({
      members: Meteor.userId()
    });
  },

  combat() {
    const currentCombat = Combat.findOne({
      owner: Meteor.userId()
    });
    if (!currentCombat) {
      return;
    }

    currentCombat.energyPercentage = currentCombat.stats.energy / currentCombat.stats.energyMax * 100;
    currentCombat.healthPercentage = currentCombat.stats.health / currentCombat.stats.healthMax * 100;
    if (currentCombat.amulet && currentCombat.amulet.energyStorage) {
      currentCombat.amuletPercentage = currentCombat.amulet.energy / currentCombat.amulet.energyStorage * 100;
    }
    return currentCombat;
  },

  showEquipmentTab() {
    return Template.instance().state.get('currentTab') === 'equipment';
  },

  showPersonalQuestTab() {
    return Template.instance().state.get('currentTab') === 'personalQuest';
  },

  showTowerTab() {
    return Template.instance().state.get('currentTab') === 'tower';
  },

  showCombatGroupTab() {
    return Template.instance().state.get('currentTab') === 'group';
  },

  showAbilitiesTab() {
    return Template.instance().state.get('currentTab') === 'abilities';
  },

  inCurrentBattle() {
    return Battles.findOne({
      finished: false
    });
  },

  finishedBattle() {
    return Template.instance().state.get('finishedBattle');
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
  }
});
