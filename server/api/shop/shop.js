import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/users/users';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import moment from 'moment';

import { addItem, hasGems, consumeGems } from '/server/api/items/items.js';

const stripe = require("stripe")(Meteor.settings.private.stripe);
const redis = new Meteor.RedisCollection('redis');

import { unlockFarmingSpaces } from '/server/api/farming/farming';

Meteor.methods({

  'shop.fetchGlobalBuffs'() {
    return JSON.parse(redis.get('global-buffs-xpq'));
  },

  'shop.buyGlobalBuff'(type) {
    if (!_.contains(['combat', 'gathering', 'crafting'], type)) {
      throw new Meteor.Error("invalid-type", "Invalid type");
    }

    const GEM_COST = 100;

    // Does the user have 100 gems?
    const userDoc = Meteor.user();

    if (userDoc.gems < GEM_COST) {
      throw new Meteor.Error("gems-too-low", "You don't have enough gems");
    }

    // Fetch the redis doc
    const rawGlobalBuffs = redis.get('global-buffs-xpq');
    if (!rawGlobalBuffs) return;
    const globalBuffs = JSON.parse(rawGlobalBuffs);

    if (!globalBuffs[type]) {
      return;
    }

    // Take me gems!
    Users.update({
      _id: userDoc._id
    }, {
      $inc: {
        gems: (GEM_COST * -1)
      }
    });

    // Increment target buff by 1 hour
    if (moment().isAfter(globalBuffs[type])) {
      // Legend banner to all online users?
      Chats.insert({
        message: `${userDoc.username} has activated the ${type} buff for all players (1hr remaining)`,
        username: 'SERVER',
        name: 'SERVER',
        date: new Date(),
        custom: {
          roomType: 'Game'
        },
        roomId: 'General'
      });

      /* TODO in mongo db
      if (globalBuffs.users[userDoc.username]) {
        globalBuffs.users[userDoc.username] += 1;
      } else {
        globalBuffs.users[userDoc.username] = 1;
      }*/

      globalBuffs[type] = moment().add(1, 'hour').toDate();
    } else {      
      globalBuffs[type] = moment(globalBuffs[type]).add(1, 'hour').toDate();
    }

    redis.set('global-buffs-xpq', JSON.stringify(globalBuffs));
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

    if (!hasGems(requiredGems, Meteor.user())) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    // Add X days to all upgrade types
    const types = ['mining', 'crafting', 'combat', 'woodcutting', 'farming', 'inscription', 'astronomy'];
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

    if (consumeGems(requiredGems, Meteor.user())) {
      // Update membership to
      Users.update({
        _id: Meteor.userId()
      }, {
        $set: setModifier
      });
    }

  },

  'shop.buySingle'({ days, type }) {
    if (!_.contains([15, 30], days)) {
      throw new Meteor.Error("not-valid-days", "Not valid day amount");
    }

    if (!_.contains(['mining', 'crafting', 'combat', 'woodcutting', 'farming', 'inscription', 'astronomy'], type)) {
      throw new Meteor.Error("not-valid-type", "Not valid type");
    }

    // Check user has the correct # of gems to buy membership
    let requiredGems = 200;

    if (days === 15) {
      requiredGems = 100;
    }

    if (!hasGems(requiredGems, Meteor.user())) {
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

    if (consumeGems(requiredGems, Meteor.user())) {
      // Update membership to
      Users.update({
        _id: Meteor.userId()
      }, {
        $set: setModifier
      });
    }

  },

  'shop.buyItem'({ itemId }) {

    const validItems = [{
      id: 'lemonade',
      cost: 10
    }];

    const itemToBuy = _.findWhere(validItems, { id: itemId });
    if (!itemToBuy) {
      throw new Meteor.Error("invalid-item", "Invalid item");
    }

    if (!hasGems(itemToBuy.cost, Meteor.user())) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    if (consumeGems(itemToBuy.cost, Meteor.user())) {
      addItem(itemToBuy.id, 1, Meteor.userId());
    }

  },

  'shop.buyEnhancerKey'() {

    // Check user has the correct # of gems to key
    let requiredGems = 100;

    if (!hasGems(requiredGems, Meteor.user())) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    if (consumeGems(requiredGems, Meteor.user())) {
      addItem('enhancer_key', 1, Meteor.userId());
    }

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
          newGems = 2300;
        } else if (currentPack === 'box') {
          newGems = 6200;
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
