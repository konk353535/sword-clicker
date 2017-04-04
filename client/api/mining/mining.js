import { Meteor } from 'meteor/meteor';
import { Mining } from '/imports/api/mining/mining';
import { MiningSpace } from '/imports/api/mining/mining';

Meteor.methods({
  'mining.clickedMineSpace'(mineSpaceId) {
    const mining = Mining.findOne({ owner: Meteor.userId() });
    const mineSpace = MiningSpace.findOne({ _id: mineSpaceId, owner: Meteor.userId() });
    const damage = mining.stats.attack;

    if (mining.stats.energy < mining.stats.energyPerHit) {
      return;
    }

    Mining.update(mining._id, {
      $inc: {
        'stats.energy': (mining.stats.energyPerHit * -1)
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
