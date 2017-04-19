import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '/imports/api/items/items.js';

import './skillHeader.html';

Template.skillHeader.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('currentXp');
  this.state.set('currentLevel');
});

Template.skillHeader.helpers({
  xpPercentage() {
    const instance = Template.instance();
    if (instance.data.skill) {
      if (instance.state.get('currentXp')) {
        if (instance.state.get('currentLevel') === instance.data.skill.level) {
          // Show tick for this skill
          const xpGained = instance.data.skill.xp - instance.state.get('currentXp');
          if (xpGained > 0) {
            const element = `
              <p
                class='floating-text'
                data-count=1
                style='top: 75px; right: 25px; opacity: 1.0;'>
                +${xpGained} <i class="lilIcon-${instance.data.skill.type}"></i>
              </p>
            `;

            $('body').append(element);
          }
        } else {
          const maxWidth = $(window).width() - 100;
          const perWidth = maxWidth / 7;
          const setHeight = ($(window).height() / 2);
          for (let i = 0; i < 7; i++) {
            const top = setHeight;
            const left = 50 + parseInt(perWidth * i);
            const element = `
              <p
                class='floating-text text-white bg-primary'
                data-count=-50
                style='top: ${top}px; left: ${left}px; opacity: 1.0;'>
                <span class='text-capitalize'>
                  ${instance.data.skill.type}
                </span> Level Up <i class="lilIcon-${instance.data.skill.type}"></i>
              </p>
            `;

            $('body').append(element);
          }
        }
      }

      // Set initial value
      instance.state.set('currentXp', instance.data.skill.xp);
      instance.state.set('currentLevel', instance.data.skill.level);

      return (instance.data.skill.xp / instance.data.skill.xpToLevel) * 100;
    } else {
      return 0;
    }
  }
})
