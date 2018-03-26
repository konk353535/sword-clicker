import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';

import './clan.html';

import {sortBy} from 'lodash';
import { Clans, ClanInvites } from '/imports/api/clans/clans.js';
import { Users } from '/imports/api/users/users.js';

Template.clanPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('rawLeaderboardData', []);
  this.state.set('leaderboardData', []);
  this.state.set('sortOption', 'total');

  Meteor.subscribe('clans');
  Meteor.subscribe('clanInvites');
  Meteor.subscribe('friendsFeed');

  this.autorun(() => {
    const myClan = Clans.findOne();

    if (myClan) {
      Meteor.call('clan.leaderboard', (err, raw) => {
        if (raw) {
          this.state.set('rawLeaderboardData', raw);
          const membersMap = {};

          raw.forEach((data) => {
            if (membersMap[data.owner]) {
              membersMap[data.owner].total += data.score;
              if (membersMap[data.owner][data.type]) {
                membersMap[data.owner][data.type] += data.score;
              } else {
                membersMap[data.owner][data.type] = data.score;
              }
            } else {
              membersMap[data.owner] = {
                total: data.score,
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

    return sortBy(instance.state.get('leaderboard').map((user, index) => {
      const newUser = {};
      newUser.username = Users.findOne({ _id: user.owner }).username;
      newUser.rank = index + 1;
      Object.keys(user).forEach((key) => {
        const newKey = key.replace('-weekly', '');
        newUser[newKey] = user[key]; 
      });
      return newUser;
    }), sortOption).reverse();
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

    return Users.find({
      _id: {
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
