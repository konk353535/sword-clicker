import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Numeral from 'numeral';

import { Users } from '/imports/api/users/users.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import { CDbl, CInt, autoPrecisionValue } from '/imports/utils';

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
    const instance = Template.instance();
    const templateData = instance.data;
    let number = CDbl(templateData.number);
    const decimalPlaces = templateData.decimal || 0;
    const wantDecimal = !templateData.noDecimal;
    const wantShorthand = templateData.forceShorthand || instance.state.get('showNumberShorthand');
    const wantBlankZero = templateData.blankZero;
    const wantAutoPrecision = (typeof templateData.autoPrecision === 'undefined') ? true : templateData.autoPrecision; // true by default
    
    if (wantBlankZero) {
      if (CInt(number) === 0) {
        return '';
      }
    }
    
    if (wantAutoPrecision) {
      number = autoPrecisionValue(number)
      
      if (wantShorthand && number >= 1000) {
        return Numeral(number).format('0.0a');
      }
      
      return number.toLocaleString();
    }

    
    if (number < 1000) {
      if (decimalPlaces) {
        return number.toFixed(CInt(decimalPlaces));
      }
      
      return Math.floor(number);
    }

    if (wantShorthand && number >= 1000) {
      if (!wantDecimal) {
        return Numeral(number).format('0a');
      }

      return Numeral(number).format('0.0a');
    }
    
    return Numeral(number).format('0,0');
  }
});
