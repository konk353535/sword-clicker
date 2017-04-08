import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/users/users';
import moment from 'moment';

const stripe = require("stripe")(Meteor.settings.private.stripe);

import { unlockFarmingSpaces } from '/server/api/farming/farming';

Meteor.methods({

  'shop.buyMembership'(days) {
    if (!_.contains([15, 30], days)) {
      throw new Meteor.Error("not-valid-days", "Not valid day amount");
    }

    // Check user has the correct # of gems to buy membership
    let requiredGems = 10;
    let unlockFarming = false;

    if (days === 15) {
      requiredGems = 5;
    }

    if (Meteor.user().gems < requiredGems) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    // Add X days to membership
    let membershipTo = Meteor.user().membershipTo;
    if (!membershipTo) {
      unlockFarming = true;
      membershipTo = moment().add(days, 'days');
    } else {
      // There is an existing membership, see if it's still active
      if (moment().isBefore(membershipTo)) {
        membershipTo = moment(membershipTo).add(days, 'days');
      } else {
        unlockFarming = true;
        membershipTo = moment().add(days, 'days');
      }
    }

    // Update membership to and gems
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        membershipTo: membershipTo.toDate()
      },
      $inc: {
        gems: (requiredGems * -1)
      }
    });

    if (unlockFarming) {
      unlockFarmingSpaces(Meteor.userId());
    }
  },

  'shop.purchase'({ token }) {

    let handleCharge = Meteor.wrapAsync( stripe.charges.create, stripe.charges );
    let payment = handleCharge({
      amount: 499,
      currency: "usd",
      description: "Small Coin Pack",
      source: token,
    });

    if (payment.id) {
      Users.update({
        _id: Meteor.userId(),
      }, {
        $inc: {
          gems: 5
        }
      })
    }

    return payment;
  }

})
