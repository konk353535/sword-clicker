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

  'shop.purchase'({ token, currentPack }) {
    if (!_.contains(['bunch', 'bag', 'box'], currentPack)) {
      throw new Meteor.Error("invalid-pack-type", "Pack type can only be bunch, bag or box");
    }
    let handleCharge = Meteor.wrapAsync( stripe.charges.create, stripe.charges );

    let payment;
    if (currentPack === 'bunch') {
      payment = handleCharge({
        amount: 499,
        currency: "usd",
        description: "Bunch Of Gems",
        source: token,
      });
    } else if (currentPack === 'bag') {
      payment = handleCharge({
        amount: 999,
        currency: "usd",
        description: "Bag Of Gems",
        source: token,
      });
    } else if (currentPack === 'box') {
      payment = handleCharge({
        amount: 1999,
        currency: "usd",
        description: "Box Of Gems",
        source: token,
      });
    }

    if (payment.id) {
      let newGems = 0;
      if (currentPack === 'bunch') {
        newGems = 5;
      } else if (currentPack === 'bag') {
        newGems = 10;
      } else if (currentPack === 'box') {
        newGems = 25;
      }

      Users.update({
        _id: Meteor.userId(),
      }, {
        $inc: {
          gems: newGems
        }
      })
    }

    return payment;
  }

});

const MINUTE = 60 * 1000;

DDPRateLimiter.addRule({ type: 'method', name: 'shop.buyMembership' }, 20, 10 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'shop.purchase' }, 20, 10 * MINUTE);
