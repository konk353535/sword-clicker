import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/users/users';
import moment from 'moment';

import { addItem } from '/server/api/items/items.js';

const stripe = require("stripe")(Meteor.settings.private.stripe);

import { unlockFarmingSpaces } from '/server/api/farming/farming';

Meteor.methods({

  'shop.buyEnhancerKey'() {
    const requiredGems = 80;
    if (Meteor.user().gems < requiredGems) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    Users.update(Meteor.userId(), {
      $inc: {
        gems: (requiredGems * -1) 
      }
    });

    addItem('enhancer_key', 1, Meteor.userId());
  },

  'shop.buyMembership'(days) {
    if (!_.contains([15, 30], days)) {
      throw new Meteor.Error("not-valid-days", "Not valid day amount");
    }

    // Check user has the correct # of gems to buy membership
    let requiredGems = 900;
    let unlockFarming = false;

    if (days === 15) {
      requiredGems = 500;
    }

    if (Meteor.user().gems < requiredGems) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    // Add X days to all upgrade types
    const types = ['mining', 'crafting', 'combat', 'woodcutting', 'farming', 'inscription'];
    const setModifier = {};

    types.forEach((type) => {

      // Add X days to specified typemembership
      let membershipTo = Meteor.user()[`${type}UpgradeTo`];
      if (!membershipTo || moment().isAfter(membershipTo)) {
        membershipTo = moment().add(days, 'days').toDate();
      } else {
        membershipTo = moment(membershipTo).add(days, 'days').toDate();
      }

      setModifier[`${type}UpgradeTo`] = membershipTo;

    });

    // Update membership to and gems
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: setModifier,
      $inc: {
        gems: (requiredGems * -1)
      }
    });

    // To Do...
    /*
    if (unlockFarming) {
      unlockFarmingSpaces(Meteor.userId());
    }*/
  },

  'shop.buySingle'({ days, type }) {
    if (!_.contains([15, 30], days)) {
      throw new Meteor.Error("not-valid-days", "Not valid day amount");
    }

    if (!_.contains(['mining', 'crafting', 'combat', 'woodcutting', 'farming', 'inscription'], type)) {
      throw new Meteor.Error("not-valid-type", "Not valid type");
    }

    // Check user has the correct # of gems to buy membership
    let requiredGems = 200;

    if (days === 15) {
      requiredGems = 100;
    }

    if (Meteor.user().gems < requiredGems) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    // Add X days to specified typemembership
    let membershipTo = Meteor.user()[`${type}UpgradeTo`];
    if (!membershipTo || moment().isAfter(membershipTo)) {
      membershipTo = moment().add(days, 'days').toDate();
    } else {
      membershipTo = moment(membershipTo).add(days, 'days').toDate();
    }

    const setModifier = {}
    setModifier[`${type}UpgradeTo`] = membershipTo;

    // Update membership to and gems
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: setModifier,
      $inc: {
        gems: (requiredGems * -1)
      }
    });

    // To Do...
    /*
    if (unlockFarming) {
      unlockFarmingSpaces(Meteor.userId());
    }*/
  },


  'shop.purchase'({ token, currentPack }) {
    if (!_.contains(['bunch', 'bag', 'box'], currentPack)) {
      throw new Meteor.Error("invalid-pack-type", "Pack type can only be bunch, bag or box");
    }
    let handleCharge = Meteor.wrapAsync( stripe.charges.create, stripe.charges );

    let payment;
    try {
      if (currentPack === 'bunch') {
        payment = handleCharge({
          amount: 499,
          currency: "usd",
          description: "Bunch Of Gems",
          source: token,
          metadata: {
            userId: Meteor.userId(),
            username: Meteor.user().username 
          }
        });
      } else if (currentPack === 'bag') {
        payment = handleCharge({
          amount: 1999,
          currency: "usd",
          description: "Bag Of Gems",
          source: token,
          metadata: {
            userId: Meteor.userId(),
            username: Meteor.user().username 
          }
        });
      } else if (currentPack === 'box') {
        payment = handleCharge({
          amount: 4999,
          currency: "usd",
          description: "Box Of Gems",
          source: token,
          metadata: {
            userId: Meteor.userId(),
            username: Meteor.user().username 
          }
        });
      }

      if (payment.id) {
        let newGems = 0;
        if (currentPack === 'bunch') {
          newGems = 500;
        } else if (currentPack === 'bag') {
          newGems = 1300;
        } else if (currentPack === 'box') {
          newGems = 3500;
        }

        Users.update({
          _id: Meteor.userId(),
        }, {
          $inc: {
            gems: newGems
          }
        })
      }
    } catch(err) {
      throw new Meteor.Error("unknown-error", "Unknown error occured when attempting to purchase gems");
    }

    return payment;
  }

});

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'shop.buyMembership' }, 20, 10 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'shop.purchase' }, 20, 10 * MINUTE);
