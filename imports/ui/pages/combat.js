import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';
import lodash from 'lodash';

import { Combat } from '/imports/api/combat/combat.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Battles, BattlesList } from '/imports/api/battles/battles.js';
import { Groups } from '/imports/api/groups/groups.js';
import { Users } from '/imports/api/users/users.js';
import { State } from '/imports/api/state/state';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

import { STATE_BUFFS } from '/imports/constants/state';

// Component used in the template
import '/imports/ui/components/combat/foodIcon/foodIcon.js';
import '/imports/ui/components/combat/buffIcon/buffIcon.js';
import '/imports/ui/components/combat/combatAbilitiesTab/combatAbilitiesTab.js';
import '/imports/ui/components/combat/battleLogTab/battleLogTab.js';
import '/imports/ui/components/combat/skinTab/skinTab.js';
import '/imports/ui/components/combat/currentBattleUi/currentBattleUi.js';
import '/imports/ui/components/combat/towerTab/towerTab.js';
import '/imports/ui/components/combat/equipmentTab/equipmentTab.js';
import '/imports/ui/components/combat/combatGroupTab/combatGroupTab.js';
import '/imports/ui/components/combat/personalQuestTab/personalQuestTab.js';

import './combat.html';

Template.combatPage.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();

  this.state.set('hasLearnRequirements', false);

  Tracker.autorun(() => {
    let globalBuffs = State.find({name: {$in: Object.values(STATE_BUFFS)}, 'value.activeTo': {$gte: moment().toDate()}}).fetch();
    globalBuffs = lodash.fromPairs(globalBuffs.map((buff) => [buff.name, buff.value.activeTo]));
    this.state.set('globalBuffs', globalBuffs);
  });

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

  Meteor.subscribe('battles');
  Meteor.subscribe('floorWaveScores');

  this.autorun(() => {

    const finishedBattle = Battles.findOne({
      finished: true,
      createdAt: {
        $gte: moment().subtract(5, 'minutes').toDate()
      }
    }, {
      sort: {
        createdAt: -1
      }
    });

    if (finishedBattle) {
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

  Tracker.autorun(() => {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    if (!currentGroup) {
      return;
    }

    if (currentGroup && currentGroup.members.length !== this.state.get('currentMemberCount')) {
      setTimeout(() => {
        Meteor.subscribe('combat');
        this.state.set('currentMemberCount', currentGroup.members.length);
      }, 1500);
    }
  });

  Tracker.autorun(() => {
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

Template.combatPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'attack');
  },

  'click .personalQuestTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'personalQuest') {
      instance.state.set('currentTab', 'personalQuest');
      Meteor.call('users.setUiState', 'combatTab', 'personalQuest');
    }
  },

  'click .towerTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'tower') {
      instance.state.set('currentTab', 'tower');
      Meteor.call('users.setUiState', 'combatTab', 'tower');
    }
  },

  'click .adventuresTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'adventures') {
      instance.state.set('currentTab', 'adventures');
      Meteor.call('users.setUiState', 'combatTab', 'adventures');
    }
  },

  'click .equipmentTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'equipment') {
      instance.state.set('currentTab', 'equipment');
      Meteor.call('users.setUiState', 'combatTab', 'equipment');
    }
  },

  'click .abilitiesTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'abilities') {
      instance.state.set('currentTab', 'abilities');
      Meteor.call('users.setUiState', 'combatTab', 'abilities');
    }
  },

  'click .skinsTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'skins') {
      instance.state.set('currentTab', 'skins');
      Meteor.call('users.setUiState', 'combatTab', 'skins');
    }
  },

  'click .battleLogTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'battleLog') {
      instance.state.set('currentTab', 'battleLog');
      Meteor.call('users.setUiState', 'combatTab', 'battleLog');
    }
  },

  'click .groupTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'group') {
      instance.state.set('currentTab', 'group');
      Meteor.call('users.setUiState', 'combatTab', 'group');
    }
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

  globalBuffs() {
    return Template.instance().state.get('globalBuffs');
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

  showAdventuresTab() {
    return Template.instance().state.get('currentTab') === 'adventures';
  },

  showCombatGroupTab() {
    return Template.instance().state.get('currentTab') === 'group';
  },

  showBattleLogTab() {
    return Template.instance().state.get('currentTab') === 'battleLog';
  },

  showAbilitiesTab() {
    return Template.instance().state.get('currentTab') === 'abilities';
  },

  showSkinsTab() {
    return Template.instance().state.get('currentTab') === 'skins';
  },

  inCurrentBattle() {
    const currentBattleList = BattlesList.findOne({
      owners: Meteor.userId()
    });
    return !!currentBattleList;
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
