// routes.js

Router.route('/', {
  name: 'home',
  title: '', // specifically no title
  template: 'homePage',
  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' },
  },
  onBeforeAction: function () {
    const meteorUser = Meteor.user();
    if (meteorUser) {
      if (meteorUser.tutorial) {
        Router.go('mining');
      } else {
        Router.go('overview');
      }
    } else {
      this.next();
    }
  },
});

(['gameHome', 'overview']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Overview',
    template: 'overviewPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['guest', 'guestSettings']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Guest Settings',
    template: 'guestSettingsPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

Router.route('/achievements', {
  name: 'achievementsPage',
  title: 'Achievements',
  template: 'achievementsPage',
  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' },
  },
});

(['updates', 'patchNotes', 'changelog', 'changes', 'news']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Updates',
    template: 'updatesPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['faq', 'help']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Frequently Asked Questions',
    template: 'faqPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['shop', 'store', 'gems', 'gemShop', 'buy']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Gem Shop',
    template: 'shopPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['combat', 'newCombat', 'battle', 'fight']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Battle',
    template: 'newCombatPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['mine', 'mining', 'minePit']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Mining',
    template: 'miningPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['items', 'inventory', 'craft', 'crafting']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Crafting',
    template: 'craftingPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['woodcut', 'woodcutting', 'lumber', 'lumbering']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Woodcutting',
    template: 'woodcuttingPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['farm', 'farming']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Farming',
    template: 'farmingPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['inscribe', 'inscribing', 'inscription', 'enchantments', 'alchemy']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Inscribing',
    template: 'inscriptionPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['magic', 'astro', 'astrology', 'astronomy', 'spells', 'spellBook']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Astronomy & Spell Book',
    template: 'magicPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['settlement', 'hamlet', 'village', 'town', 'city']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Town',
    template: 'townPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

Router.route('/chat', {
  name: 'chat',
  title: 'Chat',
  template: 'chatPage',
  yieldRegions: {
    'nav': { to: 'nav' },
    'footer': { to: 'footer' },
  },
});

(['/profile/:username', '/p/:username']).forEach((pageShortcut, idx) => {
  Router.route(pageShortcut, {
    name: `profilePage_${idx}`,
    title: 'Profile',
    template: 'profilePage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

(['skills', 'leaderboard', 'ranking', 'rankings']).forEach((pageAlias) => {
  Router.route(`/${pageAlias}`, {
    name: pageAlias,
    title: 'Rankings',
    template: 'rankingsPage',
    yieldRegions: {
      'nav': { to: 'nav' },
      'footer': { to: 'footer' },
    },
  });
});

Router.onAfterAction(() => {
  const currentRoute = Router.current();
  if (currentRoute && currentRoute.route && currentRoute.route.options) {
    const pageName = (currentRoute.route.options.title) ? currentRoute.route.options.title : currentRoute.route.options.name;
    document.title = 'Eternity Tower' + ((pageName.length === 0) ? '' : ` - ${pageName.trim()}`);
  }
});
