Router.route('/home', {

  name: 'home',

  template: 'homePage',

  title: 'home',

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

Router.route('/', {

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

Router.onAfterAction(() => {
  const name = Router.current().route.options.name;
  if (name) {
    document.title = `Eternity Tower - ${name.charAt(0).toUpperCase() + name.slice(1)}`;
  }
})


