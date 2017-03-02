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
