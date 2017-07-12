import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './profile.html';

Template.profilePage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    const username = Router.current().params.username;

    // Fetch and load the profile
    Meteor.call('skills.fetchProfile', username, (err, skills) => {
      if (err) {
        return toastr.error(err.reason);
      }

      this.state.set('skills', skills.map((skill) => {
        skill.percentage = Math.round((skill.xp / skill.xpToLevel) * 100);
        return skill;
      }));
      this.state.set('username', username);
    });
  })
});

Template.profilePage.events({
})

Template.profilePage.helpers({

  skills() {
    const skillsMap = {};
    const instance = Template.instance();
    const skills = instance.state.get('skills');

    if (!skills) {
      return [];
    }

    skills.forEach((skill) => {
      skillsMap[skill.type] = skill;
    });

    return [
      { type: 'attack' },
      { type: 'defense' },
      { type: 'health' },
      { type: 'magic' },
      { type: 'mining' },
      { type: 'farming' },
      { type: 'inscription' },
      { type: 'crafting' },
      { type: 'woodcutting' },
      { type: 'astronomy' },
      { type: 'total' }
    ].map((skill) => {
      return skillsMap[skill.type];
    });
  },

  username() {
    const instance = Template.instance();
    return instance.state.get('username');
  }

})
