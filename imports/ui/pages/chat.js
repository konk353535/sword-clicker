import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './chat.html';

Template.chatPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

});

Template.chatPage.helpers({

})
