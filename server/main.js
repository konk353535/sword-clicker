import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';

/*
SyncedCron.add({
  name: 'Crunch some important numbers for the marketing department',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 2 seconds');
  },
  job: function() {
    console.log('running');
    return 1;
  }
});
*/
Meteor.startup(() => {
  // code to run on server at startup
   // SyncedCron.start();
});
