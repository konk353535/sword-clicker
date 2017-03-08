import { Template } from 'meteor/templating';
 
import './body.html';

Template.body.onCreated(function () {
  // Show items
  Meteor.subscribe('items');
  // Show skills
  Meteor.subscribe('skills');
})
