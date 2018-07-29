import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Numeral from 'numeral';

import { Users } from '/imports/api/users/users.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './formatNumber.html';

Template.formatNumber.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.showNumberShorthand !== undefined) {
        this.state.set('showNumberShorthand', myUser.uiState.showNumberShorthand);
      } else {
        this.state.set('showNumberShorthand', true);
      }
    }
  });
});

Template.formatNumber.helpers({
  formattedNumber() {
    const number = Template.instance().data.number;
    const noDecimal = Template.instance().data.noDecimal;
    const decimal = Template.instance().data.decimal || 0;

    if (number < 1000) {
      if (decimal) {
        return number.toFixed(decimal);
      }
      return Math.floor(number);
    }

    if (Template.instance().state.get('showNumberShorthand') || Template.instance().data.forceShorthand) {
      if (noDecimal) {
        return Numeral(number).format('0a');
      }

      return Numeral(number).format('0.0a');
    } else {
      return Numeral(number).format('0,0');
    }
  }
});
