import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';

import './readableDuration.html';

let tooltip;

Template.readableDuration.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    const endDate = moment(this.data.endDate);

    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    const duration = moment.duration(endDate.diff(now))

    const asSeconds = duration.asSeconds();
    const asMinutes = duration.asMinutes();

    if (asSeconds < 0) {
      return '';
    } else if (asSeconds < 60) {
      return this.state.set('duration', `${Math.round(asSeconds)}s`);
    } else if (asMinutes < 60) {
      const seconds = duration.seconds();
      const minutes = duration.minutes();
      return this.state.set('duration', `${minutes}m ${seconds}s`);
    }

    const minutes = duration.minutes();
    const hours = duration.hours();
    return this.state.set('duration', `${hours}h ${minutes}m`);
  });
});

Template.readableDuration.helpers({
  duration() {
    const instance = Template.instance();
    return instance.state.get('duration');
  }
});
