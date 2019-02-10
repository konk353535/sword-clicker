Router.route('/', {

  name: 'home',

  template: 'homePage',

  title: 'home',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  },

  onBeforeAction: function () {
    const meteorUser = Meteor.user();
    if (meteorUser) {
      if (meteorUser.tutorial) {
        Router.go('mining');
      } else {
        Router.go('gameHomePage');
      }
    } else {
      this.next();
    }
  }
});

Router.route('/achievements', {

  name: 'achievementsPage',

  template: 'achievementsPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/profile/:username', {

  name: 'profilePage',

  template: 'profilePage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});


Router.route('/gameHome', {

  name: 'gameHomePage',

  template: 'gameHomePage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/updates', {

  name: 'updatesPage',

  template: 'updatesPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/guestSettings', {

  name: 'guestSettings',

  template: 'guestSettingsPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});


Router.route('/chat', {

  name: 'chat',

  template: 'chatPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/patchNotes', {

  name: 'patchNotes',

  template: 'patchNotesPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/shop', {

  name: 'shop',

  template: 'shopPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/mining', {

  name: 'mining',

  template: 'miningPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/magic', {

  name: 'magic',

  template: 'magicPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/farming', {

  name: 'farming',

  template: 'farmingPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/inscription', {

  name: 'inscription',

  template: 'inscriptionPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/woodcutting', {

  name: 'woodcutting',

  template: 'woodcuttingPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});


Router.route('/skills', {

  name: 'skills',

  template: 'skillsPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/crafting', {

  name: 'crafting',

  template: 'craftingPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/combat', {

  name: 'combat',

  template: 'combatPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.route('/newCombat', {

  name: 'newCombat',

  template: 'newCombatPage',

  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' }
  }
});

Router.onAfterAction(() => {
  const name = Router.current().route.options.name;
  if (name) {
    document.title = `Eternity Tower - ${name.charAt(0).toUpperCase() + name.slice(1)}`;
  }
});


