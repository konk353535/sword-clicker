import { Template } from 'meteor/templating';
 
import './nav.html';

Template.nav.onCreated(function bodyOnCreated() {
  Meteor.subscribe("userData");
});
