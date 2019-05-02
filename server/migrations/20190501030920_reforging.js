import { Migrations } from 'meteor/percolate:migrations';

import { Crafting } from '/imports/api/crafting/crafting.js';

Migrations.add({
    version: 1,
    name: 'Converts crafting.currentlyReforging to an array',
    up: function() {
        Crafting.find({}).forEach((crafting) => {
            if (!crafting.hasOwnProperty('currentlyReforging')) {
                // if the prop is missing, add it as an array
                Crafting.update({
                    _id: crafting._id,
                }, {
                    $set: {
                        currentlyReforging: []
                    }
                });
            } else if (!crafting.currentlyReforging.hasOwnProperty('length')) {
                // if the length prop is missing, then it currently exists and needs to be wrapped
                Crafting.update({
                    _id: crafting._id,
                }, {
                    $set: {
                        currentlyReforging: [crafting.currentlyReforging]
                    }
                });
            }
        })
    }
});