import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import Numeral from 'numeral';

import './formatNumber.html';

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

    if (noDecimal) {
      return Numeral(number).format('0a');
    }

    return Numeral(number).format('0.0a');
  }
});
