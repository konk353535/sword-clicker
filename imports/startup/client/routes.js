Router.route('/', {

  name: 'home',

  template: 'homePage',

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

Router.route('/woodcutting', {

  name: 'woodcutting',

  template: 'woodcuttingPage',

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

