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

  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: true,
  lowercaseUsername: true,

  preSignUpHook(password, options) {
    if (Meteor.isClient) {
      options.server = $('.server-selector').attr('id');
    }
  },

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
    func(value) {
      return /[^a-zA-Z\d\s:_-]/.test(value)
    },
    errStr: 'username can only contain alphanumeric characters',
    minLength: 3,
    maxLength: 20
  },
  email,
  pwd
]);


AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join'
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
  except: ['signin', 'join', 'changePwd', 'resetPwd', 'verifyEmail', 'home']
});
