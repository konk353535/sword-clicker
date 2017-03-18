import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import Numeral from 'numeral';

import './formatNumber.html';

Template.formatNumber.helpers({
  formattedNumber() {
    const number = Template.instance().data;
    if (number < 1000) {
      return Numeral(Math.floor(number)).format('0 a');
    }

    return Numeral(number).format('0.00 a');
  }
});
