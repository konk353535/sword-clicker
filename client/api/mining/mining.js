import { Meteor } from 'meteor/meteor';
import { Mining } from '/imports/api/mining/mining';
import { MiningSpace } from '/imports/api/mining/mining';

Meteor.methods({
  'mining.clickedMineSpace'(mineSpaceId, multiplier = 1) {
    const mining = Mining.findOne({ owner: Meteor.userId() });
    const mineSpace = MiningSpace.findOne({ _id: mineSpaceId, owner: Meteor.userId() });
    const damage = mining.stats.attack * multiplier;

    if (mining.stats.energy < (mining.stats.energyPerHit * multiplier)) {
      return;
    }

    Mining.update(mining._id, {
      $inc: {
        'stats.energy': (mining.stats.energyPerHit * -1 * multiplier)
      }
    });

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
})
