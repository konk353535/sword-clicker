import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import Numeral from 'numeral';

import './formatNumber.html';

Template.formatNumber.helpers({
  formattedNumber() {
    const number = Template.instance().data;
    if (number < 100000) {
      return Math.floor(number);
    }

    return Numeral(number).format('0.00 a');
  }
});
