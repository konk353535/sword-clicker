import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: true,
  lowercaseUsername: true,

  // Appearance
  showAddRemoveServices: false,
  // Email field required for this to work
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: true,

  // Client-side Validation
  continuousValidation: true,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true
})

var pwd = AccountsTemplates.removeField('password');
var email = AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 3
  },
  email,
  pwd
]);

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

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});

AccountsTemplates.configureRoute('verifyEmail', {
  name: 'verifyEmail',
  path: '/verify-email',
});

AccountsTemplates.configureRoute('changePwd')

Router.plugin('ensureSignedIn', {
  except: ['signIn', 'signUp', 'changePwd', 'resetPwd', 'verifyEmail']
});
