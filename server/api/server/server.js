import { Meteor } from "meteor/meteor";
import lodash from 'lodash';

import { Servers } from '/imports/api/servers/servers';
import { Users } from '/imports/api/users/users.js';

Meteor.methods({
  // note: this isn't used by anything directly (although an admin using the 'dev' tab or a browser's dev console could call this)
  'server.info'() {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    const userIsAdmin = userDoc && userDoc.isSuperMod;

    if (!userIsAdmin) {
      return false;
    }
    
    return Servers.findOne({ _id: Meteor.user().server });
  },
  
});
