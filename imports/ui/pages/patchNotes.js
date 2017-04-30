import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './patchNotes.html';

Template.patchNotesPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});
