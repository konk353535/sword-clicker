import { Clans, ClanInvites } from '/imports/api/clans/clans';
import { Users } from '/imports/api/users/users';

Meteor.methods({
  'clans.create'(name) {
    const userDoc = Meteor.user();

    Clans.insert({
      username: name,
      members: [userDoc._id],
      owner: userDoc._id
    });
  },

  'clans.accept'(inviteId) {

    const myClan = Clans.findOne({
      members: Meteor.userId()
    });

    if (myClan) {
      throw new Meteor.Error('your-already-in-a-clan', 'Your already in a clan');
    }

    const clanInvite = ClanInvites.findOne({
      _id: inviteId,
      invitee: Meteor.userId()
    });

    const targetClan = Clans.findOne({
      _id: clanInvite.clanId
    });

    targetClan.members.push(Meteor.userId());

    ClanInvites.remove({
      _id: clanInvite._id
    });
  },

  'clans.decline'(inviteId) {
    ClanInvites.remove({
      _id: inviteId,
      invitee: Meteor.userId()
    })
  },

  'clans.invite'(username) {
    const myClan = Clans.findOne({
      members: Meteor.userId()
    });

    if (!myClan) {
      throw new Meteor.Error('your-not-in-a-clan', 'Your not in a clan');
    }

    // Does the specified username exist
    const targetUser = Users.findOne({
      $or: [{
        username: username.toLowerCase()
      }, {
        email: username.toLowerCase()
      }]
    });

    // Check if target user is already in a clan
    const targetsClan = Clans.findOne({
      members: targetUser._id
    });

    throw new Meteor.Error('target-in-clan', 'Your target is already in a clan');

    ClanInvites.insert({
      clanId: myClan._id,
      invitee: targetUser._id
    });
  }
});

Meteor.publish('clanInvites', function() {
  return ClanInvites.find({
    invitee: this.userId
  });
});
