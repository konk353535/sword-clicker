import { Template } from 'meteor/templating';
 
import './nav.html';

Template.nav.onCreated(function bodyOnCreated() {
  Meteor.subscribe("userData");
});

Template.nav.helpers({
  currentRoute() {
    return Router.current().route.getName();
  }
});
