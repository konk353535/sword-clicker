import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';

import { Groups } from '/imports/api/groups/groups';
import { Users } from '/imports/api/users/users';

Meteor.methods({

  'groups.acceptInvite'(id, accept) {
    const targetGroup = Groups.findOne({
      _id: id,
      invites: Meteor.userId()
    });
    if (!targetGroup) {
      return;
    }

    // Remove from invites list
    targetGroup.invites = targetGroup.invites.filter((userId) => {
      if (userId === Meteor.userId()) {
        return false;
      }
      return true;
    });

    // Add user to members if accepting
    if (accept) {
      targetGroup.members.push(Meteor.userId());
    }

    Groups.update(targetGroup._id, {
      $set: {
        members: targetGroup.members,
        invites: targetGroup.invites
      }
    });
  },

  // Invite the user to your current group or create a group if not in one
  'groups.invite'(username) {
    // Does the specified username exist
    const targetUser = Users.findOne({
      username: new RegExp(username, "i")
    });

    if (!targetUser) {
      return;
    }

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: this.userId
    });

    // Must be leader to invite users
    if (currentGroup && currentGroup.leader !== this.userId) {
      return;
    }

    if (currentGroup) {
      // Add target user to group
      Groups.update(currentGroup._id, {
        $push: {
          invites: targetUser._id
        }
      });
    } else {
      // Create group with myself and the target user
      Groups.insert({
        leader: this.userId,
        members: [this.userId],
        invites: [targetUser._id]
      });
    }
  }
});

Meteor.publish('groups', function() {

  //Transform function
  var transform = function(doc) {
    // Transfer member ids to names
    const membersObjects = Users.find({
      _id: {
        $in: doc.members
      }
    }, {
      fields: {
        username: 1,
        _id: 1
      }
    }).fetch();

    const invitesObjects = Users.find({
      _id: {
        $in: doc.invites
      }
    }, {
      fields: {
        username: 1,
        _id: 1
      }
    }).fetch();

    doc.membersDetails = membersObjects;
    doc.invitesDetails = invitesObjects;
    return doc;
  }

  var self = this;

  var observer = Groups.find({
    $or: [{
      members: this.userId
    }, {
      invites: this.userId
    }]
  }).observe({
      added: function (document) {
      self.added('groups', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('groups', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('groups', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
