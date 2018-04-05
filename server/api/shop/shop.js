import { Meteor } from 'meteor/meteor';
import { Users, UserGames } from '/imports/api/users/users';
import { Combat } from '/imports/api/combat/combat';
import { State } from '/imports/api/state/state';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import moment from 'moment';

import { STATE_BUFFS } from '/imports/constants/state';

import { addItem, hasGems, consumeGems } from '/server/api/items/items.js';
import { unlockFarmingSpaces } from '/server/api/farming/farming';

import _ from 'underscore';

const stripe = require("stripe")(Meteor.settings.private.stripe);

Meteor.methods({

  'shop.fetchGlobalBuffs'() {
    return State.find({
      name: {
        $in: Object.values(STATE_BUFFS)
      }
    });
  },

  'shop.buyGlobalBuff'(type) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    if (!_.contains(Object.values(STATE_BUFFS), type)) {
      throw new Meteor.Error("invalid-type", "Invalid type");
    }

    const GEM_COST = 100;

    const userGame = UserGames.findOne({
      owner,
      game
    });

    if (userGame < GEM_COST) {
      throw new Meteor.Error("gems-too-low", "You don't have enough gems");
    }

    const globalBuff = State.findOne({
      name: type,
      game
    });

    if (!globalBuff) {
      return;
    }

    const friendlyNames = {
      buffCrafting: 'crafting',
      buffCombat: 'combat',
      buffGathering: 'gathering'
    };

    // Take me gems!
    consumeGems(GEM_COST, userGame);

    // Increment target buff by 1 hour
    if (moment().isAfter(globalBuff.value.activeTo)) {
      globalBuff.value.activeTo = moment().add(1, 'hour').toDate();
      const remaining = moment.duration(moment(globalBuff.value.activeTo).diff(moment())).humanize();
      Chats.insert({
        message: `${userDoc.username} has activated the ${friendlyNames[type]} buff for all players (${remaining} remaining)`,
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
    } else {
      globalBuff.value.activeTo = moment(globalBuff.value.activeTo).add(1, 'hour').toDate();
      const remaining = moment.duration(moment(globalBuff.value.activeTo).diff(moment())).humanize();
      Chats.insert({
        message: `${userDoc.username} has extended the ${friendlyNames[type]} buff for all players (${remaining} remaining)`,
        username: 'SERVER',
        name: 'SERVER',
        date: new Date(),
        custom: {
          roomType: 'Game'
        },
        roomId: 'General'
      });
    }

    State.update({
      name: type,
      game
    }, {
      $set: {
        value: globalBuff.value
      }
    });
  },

  'shop.buyMembership'(days) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    if (!_.contains([15, 30], days)) {
      throw new Meteor.Error("not-valid-days", "Not valid day amount");
    }

    // Check user has the correct # of gems to buy membership
    let requiredGems = 900;
    let unlockFarming = false;

    if (days === 15) {
      requiredGems = 500;
    }

    const userGame = UserGames.findOne({
      owner,
      game
    });

    if (!hasGems(requiredGems, userGame)) {
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

    if (consumeGems(requiredGems, userGame)) {
      // Update membership to
      Users.update({
        _id: owner
      }, {
        $set: setModifier
      });
    }

  },

  'shop.buySingle'({ days, type }) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

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

    const userGame = UserGames.findOne({
      owner,
      game
    });

    if (!hasGems(requiredGems, userGame)) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    // Add X days to specified typemembership
    let membershipTo = userDoc[`${type}UpgradeTo`];
    if (!membershipTo || moment().isAfter(membershipTo)) {
      membershipTo = moment().add(days, 'days').toDate();
    } else {
      membershipTo = moment(membershipTo).add(days, 'days').toDate();
    }

    const setModifier = {}
    setModifier[`${type}UpgradeTo`] = membershipTo;

    if (consumeGems(requiredGems, userGame)) {
      // Update membership to
      Users.update({
        _id: owner
      }, {
        $set: setModifier
      });
    }

  },

  'shop.buyIcon'(iconId) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    const validIcons = [
      { id: 'mage_t1', cost: 150 },
      { id: 'mage_t2', cost: 300 },
      { id: 'phoenix_t2', cost: 300 },
      { id: 'crow_t2', cost: 300 },
      { id: 'damage_t1', cost: 150 },
      { id: 'damage_t2', cost: 300 },
      { id: 'tank_t1', cost: 150 },
      { id: 'tank_t2', cost: 300 },
    ];

    const iconToBuy = _.findWhere(validIcons, { id: iconId });
    if (!iconToBuy) {
      throw new Meteor.Error("invalid-item", "Invalid item");
    }

    const userGame = UserGames.findOne({
      owner,
      game
    });

    if (!hasGems(iconToBuy.cost, userGame)) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    // Make sure user doesn't already have target icon
    const userCombat = Combat.findOne({
      owner,
      game
    });

    if (userCombat.boughtIcons && _.contains(userCombat.boughtIcons, iconToBuy.id)) {
      throw new Meteor.Error("already-own", "Already own that icon");
    }

    if (consumeGems(iconToBuy.cost, userGame)) {
      // Add the icon
      if (!userCombat.boughtIcons) {
        userCombat.boughtIcons = [iconToBuy.id];
      } else {
        userCombat.boughtIcons.push(iconToBuy.id);
      }
    }

    if (iconToBuy.id === 'crow_t2') {
      if (!_.contains(userCombat.boughtIcons, 'crow_t1')) {
        userCombat.boughtIcons.push('crow_t1');
      }
    } else if (iconToBuy.id === 'phoenix_t2') {
      if (!_.contains(userCombat.boughtIcons, 'phoenix_t1')) {
        userCombat.boughtIcons.push('phoenix_t1');
      }
    }

    // Update combat
    Combat.update({
      owner,
      game
    }, {
      $set: {
        boughtIcons: userCombat.boughtIcons
      }
    });

  },

  'shop.buyItem'({ itemId }) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    const validItems = [{
      id: 'lemonade',
      cost: 10
    }];

    const userGame = UserGames.findOne({
      owner,
      game
    });

    const itemToBuy = _.findWhere(validItems, { id: itemId });
    if (!itemToBuy) {
      throw new Meteor.Error("invalid-item", "Invalid item");
    }

    if (!hasGems(itemToBuy.cost, userGame)) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    if (consumeGems(itemToBuy.cost, userGame)) {
      addItem(itemToBuy.id, 1, owner);
    }

  },

  'shop.buyEnhancerKey'() {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    const userGame = UserGames.findOne({
      owner,
      game
    });

    // Check user has the correct # of gems to key
    let requiredGems = 100;

    if (!hasGems(requiredGems, userGame)) {
      throw new Meteor.Error("no-gems", "Not enough gems");
    }

    if (consumeGems(requiredGems, userGame)) {
      addItem('enhancer_key', 1, Meteor.userId());
    }

  },

  'shop.purchaseWithRaiBlocks'({ token, item_id }) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    // Lookup itemId, confirm that its price matches what was paid
    const ITEMS = {
      'someGems': {
        price: 5,
        gems: 5
      },
      'bunchOfGems': {
        price: 499,
        gems: 500
      }
    }

    if (!ITEMS[item_id]) {
      throw new Meteor.Error("Invalid item id given");
    }

    const amount = ITEMS[item_id].price;

    const handleCharge = HTTP.post("https://arrowpay.io/api/payment/handle", {
      data: {
        payment: {
          amount,
          currency: 'USD'
        },
        token
      }
    });

    if (handleCharge && handleCharge.data && handleCharge.data.id) {
      // Credit our account!
      UserGames.update({
        owner,
        game
      }, {
        $inc: {
          gems: ITEMS[item_id].gems
        }
      });        
    } else {
      // Throw an err
      throw new Meteor.Error("rai blocks payment failed");
    }
  },

  'shop.purchase'({ token, currentPack }) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

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
            userId: userDoc._id,
            username: userDoc.username 
          }
        });
      } else if (currentPack === 'box') {
        payment = handleCharge({
          amount: 4999,
          currency: "usd",
          description: "Box Of Gems",
          source: token,
          metadata: {
            userId: userDoc._id,
            username: userDoc.username 
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

        const userGame = UserGames.update({
          owner,
          game
        }, {
          $inc: {
            gems: newGems
          }
        });
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
