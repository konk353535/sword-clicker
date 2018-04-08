import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';

import './clan.html';

import {sortBy} from 'lodash';
import { Clans, ClanInvites } from '/imports/api/clans/clans.js';
import { Users, UserGames } from '/imports/api/users/users.js';

Template.clanPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('rawLeaderboardData', []);
  this.state.set('leaderboardData', []);
  this.state.set('sortOption', 'total');

  Tracker.autorun(() => {
    if (Meteor.user() && Meteor.user().currentGame) {
      Meteor.subscribe('clans', Meteor.user().currentGame);
      Meteor.subscribe('clanInvites', Meteor.user().currentGame);
      Meteor.subscribe('friendsFeed', Meteor.user().currentGame);
    }
  });

  this.autorun(() => {
    const myClan = Clans.findOne();

    if (myClan) {
      Meteor.call('clan.leaderboard', (err, raw) => {
        if (raw) {
          this.state.set('rawLeaderboardData', raw);
          const membersMap = {};

          raw.forEach((data) => {
            if (membersMap[data.owner]) {
              if (data.type !== 'gold-weekly') {
                membersMap[data.owner].total += data.score;
              }

              if (membersMap[data.owner][data.type]) {
                membersMap[data.owner][data.type] += data.score;
              } else {
                membersMap[data.owner][data.type] = data.score;
              }
            } else {
              membersMap[data.owner] = {
                total: data.type !== 'weekly-gold' ? data.score : 0,
                [data.type]: data.score,
                owner: data.owner
              }
            }
          });

          const members = Object.keys(membersMap).map((key) => membersMap[key]);
          this.state.set('leaderboard', members);
        }
      });      
    }
  })
});

Template.clanPage.events({

  'click .sort-btn'(event, instance) {
    const sortOption = instance.$(event.target).closest('.sort-btn').data('id');
    instance.state.set('sortOption', sortOption);
  },

  'click .btn-create'(event, instance) {
    event.preventDefault();
    const name = instance.$('#clan-name').val();

    Meteor.call('clans.create', name);
  },

  'submit .member-invite'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const text = Template.instance().$('#invitee-name').val();
 
    // Send invite request
    Meteor.call('clans.invite', text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    Template.instance().$('#invitee-name').val('');
  }
})

Template.clanPage.rendered = function () {
  setTimeout(() => {
    if (!$('.tt-hint').length) {
      Meteor.typeahead.inject();
    }
  }, 500);
}

Template.clanPage.helpers({

  leaderboardList() {
    const instance = Template.instance();
    const sortOption = instance.state.get('sortOption');

    return sortBy(instance.state.get('leaderboard').map((user) => {
      const newUser = {};
      newUser.username = UserGames.findOne({ owner: user.owner }).username;
      Object.keys(user).forEach((key) => {
        const newKey = key.replace('-weekly', '');
        newUser[newKey] = user[key]; 
      });
      return newUser;
    }), sortOption).reverse().map((user, index) => {
      user.rank = index + 1;
      return user;
    });
  },

  currentClan() {
    return Clans.findOne({});
  },

  search(query, sync, callback) {
    Meteor.call('users.search', query, {}, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      callback(res.map(function(v){ return {value: v.username}; }));
    });
  },

  clanPendingInvites() {
    return ClanInvites.find().fetch();
  },

  clanMembers() {
    const currentClan = Clans.findOne({});
    if (!currentClan) return [];

    return UserGames.find({
      owner: {
        $in: currentClan.members
      }
    }, {
      sort: {
        lastActionDate: -1
      }
    });
  },

  newClanCost() {
    const cost = {
      required: [{
        type: 'item',
        itemId: 'ore_stone',
        icon: 'stone.png',
        name: 'stone',
        amount: 500,
        consumes: true
      }, {
        type: 'gold',
        amount: 1000,
        consumes: true
      }]
    }

    let { notMet } = determineRequiredItems(cost);

    return {
      cost,
      notMet
    }
  }
})
