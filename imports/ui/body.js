import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import moment from 'moment';

import { Skills } from '/imports/api/skills/skills.js';
import { Groups } from '/imports/api/groups/groups.js';

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
let woodcuttingTimer;
let combatTimer;
let floatingTextTimer;

let cachedSkills = {};

Template.body.onCreated(function () {

  this.autorun(() => {
    // Check for gold to make sure we have the full user doc
    if (Meteor.user() && Meteor.user().gold && !Meteor.user().uiState) {
      Meteor.call('users.initUiState');
    }
  });

  // Auto tracker for invites to groups
  Tracker.autorun(() => {
    const invitedToGroups = Groups.find({
      invites: Meteor.userId()
    });

    invitedToGroups.forEach((invitedToGroups) => {
      toastr.info(`
        <div class="d-flex">
          You have been invited to a group by ${invitedToGroups.leaderName}.
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
                  style='top: 75px; right: 25px; opacity: 1.0;'>
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
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
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

  woodcuttingTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('woodcutting.gameUpdate');
    }
  }, 55 * 1000 + (Math.random() * 1000));

  combatTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('combat.gameUpdate');
    }
  }, 113 * 1000 + (Math.random() * 1000));

  craftingTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('crafting.updateGame');
    }
  }, 60 * 1000 + (Math.random() * 1000));

  /*
  floatingTextTimer = Meteor.setInterval(() => {
    let viewWidth = $(window).width();
    let count = 0;
    // Increase height and decrease opacity
    $(".floating-text").each(function(i) {      
      count++;
      if (count > 50) {
        $(this).remove();
        return;
      }
      var y = $(this).position().top;
      var count = $(this).data('count');

      if(viewWidth <= 768) {
        count += 1;
        $(this).css('opacity', $(this).css('opacity') - 0.01);
      }

      if (count > 15) {
        $(this).css('opacity', $(this).css('opacity') - 0.01);
      }

      $(this).css('top', y - 1.0);
      if(count > 60){
        $(this).remove();
      } else {
        $(this).data('count', count + 1);
      }
    });
  }, 20);*/

  // Show items
  Meteor.subscribe('items');
  // Show skills
  Meteor.subscribe('skills');
  // Show groups
  Meteor.subscribe('groups');
  // Show combat details for groups
  Meteor.subscribe('combat');
});

Handlebars.registerHelper('isMember', function (id) {
  return Session.get('isMember');
});

Template.body.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(combatTimer);
  Meteor.clearInterval(craftingTimer);
  Meteor.clearInterval(miningTimer);
  Meteor.clearInterval(woodcuttingTimer);
  Meteor.clearInterval(floatingTextTimer);
});
