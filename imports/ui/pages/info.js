import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './info.html';

Template.infoPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});
