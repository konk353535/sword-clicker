import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from "meteor/session";
import { ReactiveDict } from 'meteor/reactive-dict';
import _ from 'underscore';

import { BUFFS } from '/imports/constants/buffs/index.js';

import './buffIcon.html';

// Note: Drop() is an extension of tether.js
// https://github.hubspot.com/drop/
// http://tether.io/

let tooltip;
let didTooltipInterval;

const tooltipMethod = 'drop';
//const tooltipMethod = 'tippyShort';
//const tooltipMethod = 'tippy';

Template.buffIcon.helpers({
  buffIcon() {
    try {
      const localData = Template.instance().data;

      if (localData.buff.data.icon && localData.buff.data.icon.length > 0)
        return localData.buff.data.icon;

      if (localData.buff.icon && localData.buff.icon.length > 0)
        return localData.buff.icon;
    }
    catch (err) {
    }
    
    return false;
  },

  hideBuff() {
    try {
      const localData = Template.instance().data;

      return (localData.buff.hideBuff || localData.buff.data.hideBuff);
    }
    catch (err) {
    }
    
    return false;
  },

  hideBuffFromTop() {
    try {
      const localData = Template.instance().data;

      return (localData.buff.hideBuffFromTop || localData.buff.data.hideBuffFromTop);
    }
    catch (err) {
    }
    
    return false;
  },
  
  buffImageTitle() {
    try {
      const localData = Template.instance().data;
          
      if (localData.small) {
        if (!localData.buff.uid || localData.buff.uid === undefined || localData.buff.uid === 'undefined') {
          return '';
        }

        return `${localData.buff.data.name}: ${localData.buff.data.description}`;
      }
    }
    catch (err) {
    }
    
    return '';
  },
});

Template.buffIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('didThisBuff', false);
  
  const tryToRenderTooltips = function (self) {
    if (self.state.get('didThisBuff')) {
      Meteor.clearInterval(didTooltipInterval);
      return;
    }
    
    let localData = self.data;;
    
    // overkill debugging stuff left in for educational purpose
    //if (!localData || !localData.data || !localData.data.icon) { try { localData = self; } catch (err) { } }
    //if (!localData || !localData.data || !localData.data.icon) { try { localData = self.data; } catch (err) { } }
    //if (!localData || !localData.data || !localData.data.icon) { try { localData = self.instance.data; } catch (err) { } }
    //if (!localData || !localData.data || !localData.data.icon) { try { localData = self.instance().data; } catch (err) { } }
    //if (!localData || !localData.data || !localData.data.icon) { try { localData = Template.instance().data; } catch (err) { } }

    if (!localData || !localData.buff || !localData.buff.icon) {
      Meteor.clearInterval(didTooltipInterval);
      self.state.set('didThisBuff', true);
      return;
    }
    
    const localSize = (localData.small ? 'small' : 'medium');
    
    if (!localData.buff.uid || localData.buff.uid === undefined || localData.buff.uid === 'undefined') {
      // no localData.buff.uid (waiting)
      return;
    }
    
    //console.log('Performing tooltip hook:', tooltipMethod, localSize, localData.buff.uid);
    
    const selectorA = `#buff-${localSize}-${localData.buff.uid}`;
    const selectorB = `#buff-tooltip-content-${localSize}-${localData.buff.uid}`;
    
    if ($(selectorA).length === 1 && $(selectorB).length === 0) {
      $('.body-content').append(`
        <!-- Icon Tooltip -->
        <div class="buff-tooltip-content my-tooltip-inner" id="buff-tooltip-content-${localSize}-${localData.buff.uid}">
          <h3 class='popover-title text-capitalize'>
            ${localData.buff.data.name}
          </h3>
          <div class='popover-content'>
            <div style='max-width: 350px;'>
              ${localData.buff.data.description}
            </div>
          </div>
        </div>`);
    }
    
    // this can happen if we try to render a buff after the buff is already gone (dead unit, etc.)
    if ($(selectorA).length + $(selectorB).length !== 2) {
      $(selectorA).remove();
      $(selectorB).remove();
      Meteor.clearInterval(didTooltipInterval);
      self.state.set('didThisBuff', true);
      return;
    }
    
    try {
      $(selectorA).find("img").attr('title', `${localData.buff.data.name}: ${localData.buff.data.description}`);
    } catch (err) {
    }
    
    if (tooltipMethod === 'drop') {
      if (!localData.small) {
        new Drop({
          target: $(selectorA)[0],
          content: $(selectorB)[0],
          openOn: 'hover',
          position: 'top left',
          remove: true,
        });
      } else {
        new Drop({
          target: $(selectorA)[0],
          content: $(selectorB)[0],
          openOn: 'hover',
          position: 'bottom left',
          remove: false,
          constrainToWindow: false,
          constrainToScrollParent: false,
          tetherOptions: {
            appendTo: document.querySelector('.body-content'),
          },          
        });
      }
    } else if (tooltipMethod === 'tippyShort') {
      tooltip = tippy($(selectorA)[0], {
        html: $(selectorB)[0],
        performance: true,
        animateFill: false,
        distance: 5
      });
    } else if (tooltipMethod === 'tippy') {
      const vm = self;
      vm.state.set('tooltipOpen', false);
      tooltip = tippy($(selectorA)[0],{
        appendTo: $('.body-content')[0],
        popperOptions: {
          modifiers: {
            preventOverflow: {
              enabled: true,
              boundariesElement: 'viewport'
             },
            hide: {
              enabled: false
            }
          }
        },
        html: $(selectorB)[0],
        performance: true,
        animateFill: false,
        distance: 5,
        onHide: function() {
          vm.state.set('tooltipOpen', false);
        }
      });
    }
    
    self.state.set('didThisBuff', true);
    return;
  };
  
  didTooltipInterval = Meteor.setInterval(() => {
    tryToRenderTooltips(this);
  }, 250);
});


Template.buffIcon.rendered = function () { };


Template.buffIcon.onDestroyed(function () {
  if (tooltip && tooltipMethod === 'tippy') {
    const localData = Template.instance().data;
    const localSize = (localData.small ? 'small' : 'medium');
    
    if (!localData.buff.uid || localData.buff.uid === undefined || localData.buff.uid === 'undefined') {
      return;
    }
    
    const selectorA = `#buff-${localSize}-${localData.buff.uid}`;

    const tooltipInstance = $(selectorA)[0];
    if (tooltipInstance && tooltipInstance.hasOwnProperty('_tippy')) {
      tooltipInstance._tippy.destroy();
    }
  }
});


Template.buffIcon.events({
  'click .icon-box'(event, instance) {
    if (tooltipMethod === 'tippy') {
      if ($('body').hasClass('targetting-item')) {
        return;
      }

      if(Session.get('tooltipInput') === 'touch') {
        const localData = Template.instance().data;
        const localSize = (localData.small ? 'small' : 'medium');
        
        if (!localData.buff.uid || localData.buff.uid === undefined || localData.buff.uid === 'undefined') {
          return;
        }
        
        const selectorA = `#buff-${localSize}-${localData.buff.uid}`;
        
        if (instance.state.get('tooltipOpen')) {
          // close tooltip
          let tooltipInstance = $(selectorA)[0];
          if (tooltipInstance) {
            tooltipInstance._tippy.hide();
            instance.state.set('tooltipOpen', false);
          }
        } else {
          // open tooltip
          let tooltipInstance = $(selectorA)[0];
          if (tooltipInstance) {
            tooltipInstance._tippy.show();
            instance.state.set('tooltipOpen', true);
          }
          return;
        }
      }

      const primaryAction = instance.data.item.primaryAction;
      const shiftAction = instance.data.item.shiftAction;
      const shiftKey = window.event ? window.event.shiftKey : event.originalEvent.shiftKey;
      
      if (shiftAction && shiftKey) {
        shiftAction.method();      
      } else if (primaryAction) {
        primaryAction.method();
      }
    }
  }
});
