import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Random } from 'meteor/random';

import { Groups } from '/imports/api/groups/groups';
import { FarmingSpace } from '/imports/api/farming/farming';
import { Crafting } from '/imports/api/crafting/crafting';
import { Inscription } from '/imports/api/inscription/inscription.js';
import { Adventures } from '/imports/api/adventures/adventures.js';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting.js';
import { Friends, FriendRequests } from '/imports/api/friends/friends.js';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Users } from '/imports/api/users/users';
import { Combat } from '/imports/api/combat/combat';
import { MiningSpace, Mining } from '/imports/api/mining/mining.js';

import '../components/mining/mineSpace.js';
import './overview.html';

let updatingAdventures = false;
let miningPageTimer;
let hasInitGameUpdate = false;

let intervalAdventures;
let intervalFriendsList;

Template.overviewPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('showPickAll', false);
  this.state.set('showAddFriends', false);
  this.state.set('userSuggestions', []);
  this.state.set('updatingWoodcutting', false);
  this.state.set('updatingMining', false);
  this.state.set('friendsList', undefined);

  // Show mining spaces
  Meteor.subscribe('miningSpace');

  this.autorun(() => {
    if (!hasInitGameUpdate && Mining.findOne()) {
      Meteor.call('mining.gameUpdate');
      hasInitGameUpdate = true;
    }
  });
  
  miningPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('mining.gameUpdate');
    }
  }, 60000);
  
  const updateAdventures = function (self) {
    self.state.set('adventures', self.state.get('rawAdventures').map((adventure) => {
      if (adventure.duration) {
        adventure.durationTotalDisplay = moment("2015-01-01").startOf('day').seconds(adventure.duration).format('H:mm:ss');
      }

      if (adventure.win != null) {
        adventure.isComplete = true;
      }

      adventure.inactive = !adventure.startDate;

      if (!adventure.isComplete && moment().isAfter(adventure.startDate) && moment().isBefore(adventure.endDate)) {
        // Seconds since start
        const secondsSinceStart = moment.duration(moment().diff(adventure.startDate)).asSeconds();
        // Seconds till end
        const secondsLeft = moment.duration(moment(adventure.endDate).diff(new Date())).asSeconds();
        // Total seconds for this adventure
        const totalSeconds = moment.duration(moment(adventure.endDate).diff(adventure.startDate)).asSeconds();
        // Formatted seconds left
        adventure.durationLeft = moment("2015-01-01").startOf('day').seconds(secondsLeft).format('H:mm:ss');
        adventure.percentageComplete = Math.ceil((secondsSinceStart / totalSeconds) * 100);
      }

      if (moment().isAfter(adventure.endDate) && !updatingAdventures && adventure.win == null) {
        updatingAdventures = true;
        Meteor.call('adventures.gameUpdate', (err, res) => {
          Meteor.setTimeout(() => {
            updatingAdventures = false;
          }, 20000)
        });
      }

      return adventure;
    }));
  };
  
  const updateFriendsList = function (self) {
    Meteor.call('friends.list', (err, res) => {
      self.state.set('friendsList', res);
    });
  }
  
  this.autorun(() => {
    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    const showPickAll = FarmingSpace.find().fetch().find((space) => {
      return now.isAfter(space.maturityDate) && space.plantId;
    });

    // Check mining / woodcutting gameUpdatedAt
    const mining = Mining.findOne({});
    const woodcutting = Woodcutting.findOne({});

    if (woodcutting
      && moment().subtract(5, 'minutes').isAfter(woodcutting.lastGameUpdated)
      && !this.state.get('updatingWoodcutting')
    ) {
      this.state.set('updatingWoodcutting', true);
      Meteor.call('woodcutting.gameUpdate', (err, res) => {
        this.state.set('updatingWoodcutting', false);
      });
    }

    if (mining
      && moment().subtract(5, 'minutes').isAfter(mining.lastGameUpdated)
      && !this.state.get('updatingMining')
    ) {
      this.state.set('updatingMining', true);
      Meteor.call('mining.gameUpdate', (err, res) => {
        this.state.set('updatingMining', false);
      });
    }

    this.state.set('showPickAll', !!showPickAll);
    
    if (Adventures && Adventures.findOne()) {
      this.state.set('rawAdventures', Adventures.findOne().adventures);
      updateAdventures(this);
    }
  });

  Tracker.autorun(() => {
    const friendsObject = Friends.findOne({});
    if (friendsObject && friendsObject.friends) {
      Meteor.subscribe('friendsFeed', friendsObject.friends.join(','));
    }
  });

  intervalAdventures = Meteor.setInterval(() => {
    updateAdventures(this);
  }, 1000);
  
  intervalFriendsList = updateFriendsList(this);
  Meteor.setInterval(() => {
    updateFriendsList(this);
  }, 15000);
  
  Meteor.subscribe('otherBattlers', 3);
  Meteor.subscribe('friends');
  Meteor.subscribe('mining');
  Meteor.subscribe('combat');
  Meteor.subscribe('woodcutting');
  Meteor.subscribe('crafting');
  Meteor.subscribe('inscription');
  Meteor.subscribe('friendRequests');
  Meteor.subscribe('farmingSpace');
});

Template.overviewPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(miningPageTimer);
  Meteor.clearInterval(intervalAdventures);
  Meteor.clearInterval(intervalFriendsList);
});

Template.overviewPage.helpers({

  otherBattlers() {
    const otherBattlers = Groups.find({
      lastBattleStarted: {
        $gte: moment().subtract(24, 'hours').toDate()
      }
    }, {
      limit: 3,
      sort: {
        lastBattleStarted: -1
      }
    }).fetch();

    return otherBattlers;
  },

  friendsList() {
    let friendsListState = Template.instance().state.get('friendsList');

    if (friendsListState && friendsListState.friends) {
      return friendsListState.friends.sort((a, b) => { return b.lastActivity - a.lastActivity; });
    }
    
    // not using the collection directly anymore since the collection is mutated/transformed and not an actual
    // collection with observed data that changes the collection correctly
    
    /*
    if (Friends && Friends.findOne()) {
      return Friends.findOne().friends;
    } */
    
    return false;
  },

  firstClanInvite() {
    if (ClanInvites) {
      return ClanInvites.findOne({
        invitee: Meteor.userId()
      });
    }
    return false;
  },

  firstRecievedFriendRequest() {
    if (FriendRequests) {
      return FriendRequests.findOne({
        reciever: Meteor.userId()
      });
    }
    return false;
  },

  showAddFriends() {
    return Template.instance().state.get('showAddFriends');
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

  currentGroupMembers() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    let combats;
    if (currentGroup) {
      combats = Combat.find({
        owner: {
          $in: currentGroup.members
        }
      }).fetch();

      if (currentGroup.invitesDetails && currentGroup.invitesDetails.length > 0) {
        combats = combats.concat(currentGroup.invitesDetails.map((invitee) => {
          invitee.isInvitee = true;
          return invitee;
        }));
      }
    } else {
      combats = Combat.find({
        owner: Meteor.userId()
      }).fetch();
    }

    return combats.map((userCombat) => {
      // Map stuff we want to read into stats
      userCombat.stats = {
        health: userCombat.stats.health,
        healthMax: userCombat.stats.healthMax,
        energy: userCombat.stats.energy,
        energyMax: userCombat.stats.energyMax
      }

      userCombat.name = userCombat.username;
      userCombat.icon = userCombat.characterIcon || 'character.svg';
      if (currentGroup) {
        userCombat.isLeader = userCombat.owner === currentGroup.leader;
      } else {
        userCombat.isLeader = false;
      }

      return userCombat;
    });
  },

  activeAdventures() {
    const instance = Template.instance();
    if (!instance.state.get('adventures')) {
      return;
    }
    return instance.state.get('adventures').filter((adventure) => {
      return adventure.startDate;
    });
  },
  
  lastAdventure() {
    if (Adventures && Adventures.findOne()) {
      const adventures = Adventures.findOne().adventures.filter((adventure) => {
        return !!adventure.startDate;
      });      
      return adventures.pop();
    }
    return false;
  },
  
  lastGrownThing() {
    const growingThings = FarmingSpace.find({
      plantId: {
        $not: null
      }
    }, {
      sort: {
        maturityDate: 1
      }
    }).fetch();

    if (growingThings.length === 0) {
      return false;
    }

    return growingThings.pop();
  },

  showPickAll() {
    return Template.instance().state.get('showPickAll');
  },

  creatingGuest() {
    return Template.instance().state.get('creatingGuest');
  },

  firstCrafting() {
    const crafting = Crafting.findOne({});

    if (!crafting || crafting.currentlyCrafting.length === 0) {
      return false;
    }

    return crafting.currentlyCrafting[0];
  },

  lastCrafting() {
    const crafting = Crafting.findOne({});
    if (!crafting || crafting.currentlyCrafting.length === 0) {
      return;
    }

    return crafting.currentlyCrafting[crafting.currentlyCrafting.length - 1];
  },

  otherCrafting() {
    const crafting = Crafting.findOne({});

    if (!crafting || crafting.currentlyCrafting.length <= 1) {
      return false;
    }

    return crafting.currentlyCrafting.slice(1);
  },

  firstInscription() {
    const inscription = Inscription.findOne({});

    if (!inscription || inscription.currentlyCrafting.length === 0) {
      return false;
    }

    return inscription.currentlyCrafting[0];
  },

  lastInscription() {
    const inscription = Inscription.findOne({});
    if (!inscription || inscription.currentlyCrafting.length === 0) {
      return;
    }

    return inscription.currentlyCrafting[inscription.currentlyCrafting.length - 1];
  },

  otherInscription() {
    const inscription = Inscription.findOne({});

    if (!inscription || inscription.currentlyCrafting.length <= 1) {
      return false;
    }

    return inscription.currentlyCrafting.slice(1);
  },

  updatingMining() {
    return Template.instance().state.get('updatingMining');
  },

  updatingWoodcutting() {
    return Template.instance().state.get('updatingWoodcutting');
  },

  firstPendingInvite() {
    return Groups.findOne({
      invites: Meteor.userId()
    });
  },

  inCurrentBattle() {
    const currentBattleList = BattlesList.findOne({
      owners: Meteor.userId(),
      activated: true
    });
    return !!currentBattleList;
  },

  farmingSpaces() {
    const userDoc = Meteor.user();
    const hasFarmingUpgrade = userDoc && userDoc.farmingUpgradeTo && moment().isBefore(userDoc.farmingUpgradeTo);
    
    return FarmingSpace.find().map((farmingSpace) => {
      if (farmingSpace.index === 4 || farmingSpace.index === 5) {
        farmingSpace.active = !!hasFarmingUpgrade;
      }
      return farmingSpace;
    });
  },
  
  miningSpaces() {
    return MiningSpace.find();
  },  
});

Template.overviewPage.events({

  'submit .friend-add'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const text = Template.instance().$('#add-friend-input').val();
 
    // Send invite request
    Meteor.call('friends.add', text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    Template.instance().$('#add-friend-input').val('');
  },

  'blur #add-friend-input'(event, instance) {
    setTimeout(() => {
      instance.state.set('showAddFriends', false);
    }, 500);
  },

  'click .add-friends'(event, instance) {
    instance.state.set('showAddFriends', true);
    setTimeout(() => {
      if (!$('.tt-hint').length) {
        Meteor.typeahead.inject();
      }
      $('#add-friend-input').focus();
    }, 100);
  },

  'click .collect-plants'(event, instance) {
    Meteor.call('farming.pickAll');
  },

  'click .accept-party-invite'(event, instance) {
    // Get target data
    const inviteId = instance.$(event.target).closest('.accept-party-invite').data('id');

    Meteor.call('groups.acceptInvite', inviteId, true, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .decline-party-invite'(event, instance) {
    const inviteId = instance.$(event.target).closest('.decline-party-invite').data('id');
    Meteor.call('groups.acceptInvite', inviteId, false);
  },

  'click .accept-friend-invite'(event, instance) {
    // Get target data
    const sender = instance.$(event.target).closest('.accept-friend-invite').data('sender');

    Meteor.call('friends.accept', sender, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .decline-friend-invite'(event, instance) {
    const sender = instance.$(event.target).closest('.decline-friend-invite').data('sender');
    Meteor.call('friends.decline', sender, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .cancel-friend-request'(event, instance) {
    const reciever = instance.$(event.target).closest('.cancel-friend-request').data('reciever');
    Meteor.call('friends.cancel', reciever, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },
  
  'click .cancel-adventure-btn'(event, instance) {
    const id = instance.$(event.target).closest('.cancel-adventure-btn').attr('data-id');
    Meteor.call('adventures.cancelAdventure', id, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },
  
  'click .collect-adventure-btn'(event, instance) {
    const id = instance.$(event.target).closest('.collect-adventure-btn').attr('data-id');
    Meteor.call('adventures.collectAdventure', id, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },
  
  'click .adventures-nav-link'(event, instance) {
    Meteor.call('users.setUiState', 'newCombatType', 'afk');
  },
});

Template.firstCraftingUI.events({
  'click .cancel-crafting'(event, instance) {
    const endDate = instance.$(event.target).closest('.cancel-crafting').attr('data-enddate');
    Meteor.call('crafting.cancelCraft', moment(endDate).toDate());
  }
})

Template.firstCraftingUI.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('percentage', 0);
  this.state.set('updatingGame', false);

  this.autorun(() => {
    const craftingProcess = this.data.data;
    const startDate = moment(craftingProcess.startDate);

    const endDate = moment(craftingProcess.endDate).add(150, 'milliseconds');
    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    // Generate time remaining
    const secondsRemaining = moment.duration(endDate.diff(now)).asSeconds();
    const totalTime = moment.duration(endDate.diff(startDate)).asSeconds();

    // Generate % remaining
    const percentage = ((totalTime - secondsRemaining) / totalTime) * 100;

    craftingProcess.percentage = percentage;

    if (craftingProcess.percentage < 0) {
      craftingProcess.percentage = 0;
    }

    if (craftingProcess.percentage > 100 && !this.state.get('updatingGame')) {
      this.state.set('updatingGame', true);
      Meteor.call('crafting.updateGame', (err, res) => {
        // Incase we are out of sync, backoff
        setTimeout(() => {
          this.state.set('updateGame', false);
        }, 5000);
      });
    } else if (craftingProcess.percentage < 100) {
      this.state.set('updatingGame', false);
    }

    craftingProcess.humanReadable = moment.duration(endDate.diff(now)).humanize(true);

    this.state.set('computedCraftingProcess', craftingProcess);
  });
});

Template.firstCraftingUI.helpers({
  computedCraftingProcess() {
    const instance = Template.instance();
    return instance.state.get('computedCraftingProcess');
  }
});

Template.firstInscriptionUI.events({
  'click .cancel-inscription'(event, instance) {
    const endDate = instance.$(event.target).closest('.cancel-inscription').attr('data-enddate');
    Meteor.call('inscription.cancelCraft', moment(endDate).toDate());
  }
})

Template.firstInscriptionUI.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('percentage', 0);
  this.state.set('updatingGame', false);

  this.autorun(() => {
    const inscriptionProcess = this.data.data;
    const startDate = moment(inscriptionProcess.startDate);

    const endDate = moment(inscriptionProcess.endDate).add(150, 'milliseconds');
    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    // Generate time remaining
    const secondsRemaining = moment.duration(endDate.diff(now)).asSeconds();
    const totalTime = moment.duration(endDate.diff(startDate)).asSeconds();

    // Generate % remaining
    const percentage = ((totalTime - secondsRemaining) / totalTime) * 100;

    inscriptionProcess.percentage = percentage;

    if (inscriptionProcess.percentage < 0) {
      inscriptionProcess.percentage = 0;
    }

    if (inscriptionProcess.percentage > 100 && !this.state.get('updatingGame')) {
      this.state.set('updatingGame', true);
      Meteor.call('inscription.updateGame', (err, res) => {
        // Incase we are out of sync, backoff
        setTimeout(() => {
          this.state.set('updateGame', false);
        }, 5000);
      });
    } else if (inscriptionProcess.percentage < 100) {
      this.state.set('updatingGame', false);
    }

    inscriptionProcess.humanReadable = moment.duration(endDate.diff(now)).humanize(true);

    this.state.set('computedInscriptionProcess', inscriptionProcess);
  });
});

Template.firstInscriptionUI.helpers({
  computedInscriptionProcess() {
    const instance = Template.instance();
    return instance.state.get('computedInscriptionProcess');
  }
});

Template.friendRow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {

    const computedFriend = this.data.friend;

    computedFriend.hasInvitedToMyGroup = !!Groups.findOne({
      members: Meteor.userId(),
      invites: computedFriend._id
    });

    if (computedFriend.lastActionDate === 0) {
      computedFriend.afk = true;
    } else {
      const nowTimeStamp = TimeSync.serverTime();
      const now = moment(nowTimeStamp);

      const lastActionDate = moment(computedFriend.lastActionDate);

      if (now.isAfter(lastActionDate.add(3, 'minutes'))) {
        computedFriend.afk = true;
      } else {
        computedFriend.afk = false;
      }
    }

    if (computedFriend.lastActionDate === 0) {
      computedFriend.offline = true;
    } else {
      const nowTimeStamp = TimeSync.serverTime();
      const now = moment(nowTimeStamp);

      const lastActionDate = moment(computedFriend.lastActionDate);

      if (now.isAfter(lastActionDate.add(30, 'minutes'))) {
        computedFriend.offline = true;
      } else {
        computedFriend.offline = false;
      }
    }

    this.state.set('computedFriend', computedFriend);
  });
});

Template.friendRow.events({
  'click .remove-friend'(event, instance) {
    $(event.target).addClass('remove-friend-confirm btn-danger');
    $(event.target).removeClass('remove-friend btn-warning');
    $(event.target).html('Confirm');
  },

  'click .remove-friend-confirm'(event, instance) {
    Meteor.call('friends.remove', instance.data.friend.username, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .join-group'(event, instance) {
    Meteor.call('groups.join', instance.data.friend.partyId);
  },

  'click .invite-to-group'(event, instance) {
    Meteor.call('groups.invite', instance.data.friend.username, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  }
})

Template.friendRow.helpers({
  computedFriend() {
    const instance = Template.instance();
    return instance.state.get('computedFriend');
  },

  myGroup() {
    return Groups.findOne({
      members: Meteor.userId()
    });
  },

  canInvite() {
    const currentGroup = Groups.findOne({});

    return !currentGroup || (
      currentGroup.leader === Meteor.userId() && currentGroup.members.length < 5
    );
  }
});
