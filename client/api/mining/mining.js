import { Meteor } from 'meteor/meteor';
import { Mining } from '/imports/api/mining/mining';
import { MiningSpace } from '/imports/api/mining/mining';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

Meteor.methods({
  'mining.clickedMineSpace'(mineSpaceId, multiplier = 1) {
    const mining = Mining.findOne({ owner: Meteor.userId() });
    const mineSpace = MiningSpace.findOne({ _id: mineSpaceId, owner: Meteor.userId() });
    let damage = mining.stats.attack * multiplier;

    if (mining.stats.energy < (mining.stats.energyPerHit * multiplier)) {
      return;
    }

    Mining.update(mining._id, {
      $inc: {
        'stats.energy': (mining.stats.energyPerHit * -1 * multiplier)
      }
    });

    const userDoc = Meteor.user();
    if (userDoc.miningUpgradeTo && moment().isBefore(userDoc.miningUpgradeTo)) {
      damage *= (1 + (DONATORS_BENEFITS.miningBonus / 100));
    }  

    if (mineSpace.health - damage <= 0) {
      // Mine space has been destroyed
      MiningSpace.update(mineSpace._id, {
        $set: { oreId: null }
      });
    } else {
      MiningSpace.update(mineSpace._id, {
        $inc: { health: (-1 * damage) },
      });    
    }
  }
});
