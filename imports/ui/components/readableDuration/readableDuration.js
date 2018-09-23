import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';

import './readableDuration.html';

let tooltip;

Template.readableDuration.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    let endDate;
    let startDate;
    if (this.data.endDate) {
      endDate = moment(this.data.endDate);
    } else if (this.data.startDate) {
      startDate = moment(this.data.startDate);
    }

    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    let duration;
    if (endDate) {
      duration = moment.duration(endDate.diff(now));
    } else {
      duration = moment.duration(now.diff(startDate));
    }

    const asSeconds = duration.asSeconds();
    const asMinutes = duration.asMinutes();
    const asHours = duration.asHours();

    if (asSeconds < 0) {
      return '';
    } else if (asSeconds < 60) {
      return this.state.set('duration', `${Math.round(asSeconds)}s`);
    } else if (asMinutes < 60) {
      const seconds = duration.seconds();
      const minutes = duration.minutes();
      return this.state.set('duration', `${minutes}m ${seconds}s`);
    } else if (asHours < 24) {
      const minutes = duration.minutes();
      const hours = duration.hours();
      return this.state.set('duration', `${hours}h ${minutes}m`);  
    }

    const days = duration.days();
    const hours = duration.hours();
    return this.state.set('duration', `${days}d ${hours}h`);
  });
});

Template.readableDuration.helpers({
  duration() {
    const instance = Template.instance();
    return instance.state.get('duration');
  }
});
