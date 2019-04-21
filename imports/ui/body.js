import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import moment from 'moment';

import { Skills } from '/imports/api/skills/skills.js';
import { Adventures } from '/imports/api/adventures/adventures.js';
import { Groups } from '/imports/api/groups/groups.js';
import { Combat } from '/imports/api/combat/combat.js';
import { Battles, BattlesList } from '/imports/api/battles/battles.js';

import { ITEMS, ITEM_RARITIES } from '/imports/constants/items/index.js';
import { FARMING } from '/imports/constants/farming/index.js';
import { MINING } from '/imports/constants/mining/index.js';
import { WOODCUTTING } from '/imports/constants/woodcutting/index.js';
import { GLOBALBUFFS } from '/imports/constants/globalbuffs/index.js';

import './components/accounts/accounts.html';
import './components/accounts/accounts.js';

Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
Template['override-fullPageAtForm'].replaces('fullPageAtForm');
Template['override-atError'].replaces('atError');
Template['override-atNavButton'].replaces('atNavButton');
Template['override-atPwdForm'].replaces('atPwdForm');

import './body.html';

let miningTimer;
let craftingTimer;
let adventuresTimer;
let woodcuttingTimer;
let combatTimer;
let astronomyTimer;
let floatingTextTimer;
let abilityTimer;

let cachedSkills = {};
let cachedAdventures = {};

window.gameConstants = {
  ITEMS,
  ITEM_RARITIES,
  GLOBALBUFFS,
  FARMING,
  MINING,
  WOODCUTTING
};

// track user's input type for tooltip wrangling
Session.set('tooltipInput', 'mouse');
tippy.browser.onUserInputChange = function (type) {
  Session.set('tooltipInput', type);
};

Template.body.onCreated(function () {

  this.autorun(() => {
    // Check for gold to make sure we have the full user doc
    if (Meteor.user() && Meteor.user().gold && !Meteor.user().uiState) {
      Meteor.call('users.initUiState');
    }
  });

  Tracker.autorun(() => {
    if (Meteor.user() && Meteor.user().uiState && Meteor.user().uiState.showSummaryList) {
      // Make sure not on mobile
      if ($(window).width() > 1150) {
        // Show woodcutting
        Meteor.subscribe('woodcutting');
        // Show mining spaces
        Meteor.subscribe('miningSpace');
        // Mining data
        Meteor.subscribe('mining');
        // Show currently crafting items
        Meteor.subscribe('crafting');
        // Farming
        Meteor.subscribe('farmingSpace');
        // Show currently inscripting items
        Meteor.subscribe('inscription');
      }
    }
  });

  // auto tracker for detecting battle completion to begin cd cooldown interval
  Tracker.autorun(() => {
    const finishedBattle = Battles.findOne({
      finished: true,
      updatedAt: {
        $gte: moment().subtract(15, 'second').toDate()
      }
    }, {
      sort: {
        updatedAt: -1
      }
    });

    //if (finishedBattle) {
    //  subAbilityTimer()
    //}
  });

  /*
  let subAbilityTimer = function() {
    abilityTimer = Meteor.setInterval(() => {
      if (Meteor.userId()) {
        Meteor.call('abilities.gameUpdate', (err, res) => {
          // clear if all abilities are cooled down
          if (res) {
            Meteor.clearInterval(abilityTimer);
          }
        }); 
      }
    }, 10000);
  };

  // call initially in case of preexisting cooldowns
  subAbilityTimer();
  */
  
  // Auto tracker for invites to groups
  Tracker.autorun(() => {
    const invitedToGroups = Groups.find({
      invites: Meteor.userId()
    });

    invitedToGroups.forEach((invitedToGroups) => {
      toastr.info(`
        <div class="d-flex" style="white-space: nowrap; max-width: 250px; overflow: hidden; text-overflow: ellipsis">
          Group invite from ${invitedToGroups.leaderName}.
        </div>
      `)
    });
  });

  // Store if the user is an active membership in session
  Tracker.autorun(() => {
    if (Meteor.user()) {
      const membershipTo = Meteor.user().membershipTo;
      if (membershipTo && moment().isBefore(membershipTo)) {
        Session.set('isMember', true);
      } else {
        Session.set('isMember', false);
      }
    }
  });

  Tracker.autorun(() => {
    const myAdventures = Adventures.findOne({});
    if (!myAdventures) {
      return;
    }

    // Iterate on adventures
    myAdventures.adventures.forEach((adventure) => {
      if (adventure.win != null && !cachedAdventures[adventure.id]) {
        if (adventure.win) {
          toastr.success('An adventure has succeeded')
        } else {
          toastr.error('An adventure has failed')
        }
        cachedAdventures[adventure.id] = true;
      }
    });
  });

  // Track exp and level drops
  Tracker.autorun(() => {
    const skills = Skills.find({}).fetch();

    skills.forEach((skill) => {
      if (skill.type !== 'total' || skill.owner !== Meteor.userId()) {
        const skillCache = cachedSkills[skill.type];
        if (skillCache) {
          if (skillCache.level === skill.level) {
            // Show tick for this skill
            let xpGained = skill.xp - skillCache.xp;
            if (xpGained > 0) {
              if (xpGained < 1) {
                xpGained = xpGained.toFixed(2);
              } else {
                xpGained = Math.round(xpGained);
              }
              const element = $(`
                <p
                  class='floating-text'
                  data-count=1
                  style='top: 100px; right: 25px; opacity: 1.0;'>
                  +${xpGained} <i class="lilIcon-${skill.type}"></i>
                </p>
              `);

              $('body').append(element);
              $(element).animateCss('fadeOutUp');
            }
          } else {
            for (let i = 0; i < 2; i++) {
              const element = $(`
                <p
                  class='floating-text text-white bg-primary'
                  data-count=-50
                  style='top: 150px; right: 50px; opacity: 1.0;'>
                  <span class='text-capitalize'>
                    ${skill.type}
                  </span> Level Up <i class="lilIcon-${skill.type}"></i>
                </p>
              `);

              $('body').append(element);
              $(element).animateCss('fadeOutUp');
            }
          }
          skillCache.xp = skill.xp;
          skillCache.level = skill.level;
          skillCache.owner = skill.owner;
        } else {
          cachedSkills[skill.type] = {
            xp: skill.xp,
            level: skill.level,
            owner: skill.owner
          }
        }
      }
    });
  });


  $.fn.extend({
    animateCss: function (animationName) {
      const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).remove();
        });
    }
  });

  miningTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('mining.gameUpdate');
    }
  }, 116 * 1000 + (Math.random() * 1000));

  adventuresTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('adventures.gameUpdate');
    }
  }, 112 * 1000 + (Math.random() * 1000));

  woodcuttingTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('woodcutting.gameUpdate');
    }
  }, 55 * 1000 + (Math.random() * 1000));

  combatTimer = Meteor.setInterval(function () {
    const currentBattle = BattlesList.findOne({});
    const combat = Combat.findOne({
      owner: Meteor.userId()
    });

    const inBattle = !!currentBattle;
    const hasBuff = combat.buffs.length > 0;
    const isFullHealth = combat.stats.health >= combat.stats.healthMax;
    const isFullEnergy = combat.stats.energy >= combat.stats.energyMax;
    let isFullAmuletEnergy = true;
    if (combat.amulet) {
      isFullAmuletEnergy = combat.amulet.energy >= combat.amulet.energyStorage;
    }

    if (Meteor.user() && !inBattle && (hasBuff || !isFullHealth || !isFullEnergy || !isFullAmuletEnergy)) {
      Meteor.call('combat.gameUpdate');
    } else if (Math.random() * 10 > 8) {
      Meteor.call('combat.gameUpdate');      
    }
  }, 8000);

  craftingTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('crafting.updateGame');
    }
  }, 60 * 1000 + (Math.random() * 1000));

  astronomyTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('astronomy.gameUpdate');
    }
  }, 60 * 1000 + (Math.random() * 1000));

  // Show items
  Meteor.subscribe('items');
  // Show skills
  Meteor.subscribe('skills');
  // Show Abilities
  Meteor.subscribe('abilities');
  // Show groups
  Meteor.subscribe('groups');
  // Show combat details for groups
  Meteor.subscribe('combat');
  // Adventures
  Meteor.subscribe('adventures');
  // Battle List
  Meteor.subscribe('battlesList');
  // State
  Meteor.subscribe('state');

  // Only use these if summary list is showing & not mobile

});

Template.body.rendered = function() {
  const baseOptions = {
    "newestOnTop": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
  };

  if ($(window).width() < 768) {
    baseOptions.positionClass = "toast-bottom-center";
    toastr.options = baseOptions;
  } else {
    toastr.options = baseOptions;
  }

  $(document).on('click','.navbar-collapse.show',function(e) {
    if( $(e.target).is('a') && ( $(e.target).attr('class') !== 'dropdown-toggle' ) ) {
      $(this).collapse('hide');
    }
  });
};

Template.myLayout.helpers({
  currentRoute() {
    return Router.current().route.getName();
  },

  inCurrentBattle() {
    return BattlesList.findOne({});
  }
});

Template.body.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(combatTimer);
  Meteor.clearInterval(craftingTimer);
  Meteor.clearInterval(adventuresTimer);
  Meteor.clearInterval(miningTimer);
  Meteor.clearInterval(astronomyTimer);
  Meteor.clearInterval(woodcuttingTimer);
  Meteor.clearInterval(floatingTextTimer);
});

Template.registerHelper('math', function () {
  let result = ( terms, cb ) => terms.pop() && terms.reduce( cb );

  return {
    mul ( ...terms ) { return result( terms, ( a, b ) => a * b ); },
    div ( ...terms ) { return result( terms, ( a, b ) => b ? a / b : 0 ); },
    sum ( ...terms ) { return result( terms, ( a, b ) => a + b ); },
    sub ( ...terms ) { return result( terms, ( a, b ) => a - b ); },
  }
} );
