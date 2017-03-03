import { Meteor } from 'meteor/meteor';
import { Items } from '/imports/api/items/items';
import { ITEMS } from '/server/constants';

export const addItem = function (itemId, amount) {

  const currentItem = Items.findOne({ owner: Meteor.userId(), itemId });
  const itemConstants = ITEMS[itemId];

  if (currentItem) {
    // Update
    Items.update({ _id: currentItem._id }, {
      $inc: { amount: 1 }
    });
  } else {
    // Insert
    Items.insert({
      category: 'mining',
      itemId,
      owner: Meteor.userId(),
      category: itemConstants.category
    });
  }
}

Meteor.methods({
});

Meteor.publish('items', function() {

  //Transform function
  var transform = function(doc) {
    return doc;
  }

  var self = this;

  var observer = Items.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('items', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('items', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('items', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
