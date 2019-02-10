import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './faq.html';

Template.faqPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});
