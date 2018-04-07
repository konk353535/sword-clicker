import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users, UserGames } from '/imports/api/users/users.js';
import { Games, GameInvites } from '/imports/api/games/games.js';

import _ from 'underscore';

import './games.html';

Template.gamesPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.subscribe('gameInvites');
  Meteor.subscribe('friendsFeed', 'games');
});


Template.gamesPage.events({
  'click .create-game'(event, instance) {
    Meteor.call('games.create', 'Test');
  },

  'submit .game-name'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();
 
    const game = instance.$(event.target).closest('.game-name').attr('data-game');
    const text = instance.$(event.target).closest('.game-name').find('#game-name').val();

    // Send invite request
    Meteor.call('games.updateName', game, text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    Template.instance().$('#game-name').val('');
  },

  'submit .game-invite'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();
 
    const game = instance.$(event.target).closest('.game-invite').attr('data-game');
    const text = instance.$(event.target).closest('.game-invite').find('#invitee-name').val();

    // Send invite request
    Meteor.call('games.invite', game, text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    Template.instance().$('#invitee-name').val('');
  }
});

Template.gamesPage.rendered = function () {
  setTimeout(() => {
    if (!$('.tt-hint').length) {
      Meteor.typeahead.inject();
    }
  }, 500);
}

Template.gamesPage.helpers({
  search(query, sync, callback) {
    Meteor.call('users.search', query, {}, function(err, res) {
      console.log(res);
      if (err) {
        console.log(err);
        return;
      }
      callback(res.map(function(v){ return {value: v.username}; }));
    });
  },

  gamesList() {
    const allUserGames = UserGames.find({}).fetch({});

    return Games.find().map((game) => {
      game.membersCount = game.members.length;
      game.members = game.members.map((member) => {
        return UserGames.findOne({
          owner: member
        });
      });

      game.invites = GameInvites.find({
        game: game._id
      });

      return game;
    });
  }
});
