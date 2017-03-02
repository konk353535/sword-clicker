import { AccountsTemplates } from 'meteor/useraccounts:core';

Router.configure({
  layoutTemplate: 'myLayout',
  yieldTemplates: {
    nav: { to: 'nav' },
    footer: { to: 'footer' },
  }
});

AccountsTemplates.configure({
  defaultLayout: 'myLayout',
  showForgotPasswordLink: true
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join',
});

AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  path: '/forgot-password',
});

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});

Router.plugin('ensureSignedIn', {
    except: ['signIn', 'signUp', 'forgotPwd', 'resetPwd']
});
