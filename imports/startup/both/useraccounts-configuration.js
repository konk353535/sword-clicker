import { AccountsTemplates } from "meteor/useraccounts:core"

import { Users } from "/imports/api/users/users"

Router.configure({
    layoutTemplate: "myLayout",
    yieldTemplates: {
        nav: { to: "nav" },
        footer: { to: "footer" }
    }
})

AccountsTemplates.configure({
    defaultLayout: "myLayout",

    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: true,

    preSignUpHook(password, options) {
        if (Meteor.isClient) {
            options.server = $(".server-selector").attr("id")
        }
    },

    // https://github.com/meteor-useraccounts/core/blob/master/Guide.md
    postSignUpHook(userId, info) {
        if (Meteor.isServer) {
            const userDoc = Users.findOne({ _id: userId })
            if (userDoc) {
                // NOTE: new players are not announced during creation anymore, but instead are announced when the tutorial is completed or skipped
                /*
        Chats.insert({
          message: `Welcome new player ${userDoc.username} to the game!`,
          username: 'GAME',
          name: 'GAME',
          date: new Date(),
          custom: {
            roomType: 'General'
          },
          roomId: `General`
        });
        */
            }
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

const pwd = AccountsTemplates.removeField("password")
const email = AccountsTemplates.removeField("email")
AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        displayName: "username",
        required: true,
        func(value) {
            return /[^a-zA-Z\d\s:_-]/.test(value)
        },
        errStr: "username can only contain alphanumeric characters",
        minLength: 3,
        maxLength: 20
    },
    email,
    pwd
])

AccountsTemplates.configureRoute("signIn", {
    name: "signin",
    path: "/signin"
})

AccountsTemplates.configureRoute("signUp", {
    name: "join",
    path: "/join"
})

AccountsTemplates.configureRoute("resetPwd", {
    name: "resetPwd",
    path: "/reset-password"
})

AccountsTemplates.configureRoute("verifyEmail", {
    name: "verifyEmail",
    path: "/verify-email"
})

AccountsTemplates.configureRoute("changePwd")

Router.plugin("ensureSignedIn", {
    except: ["signin", "join", "changePwd", "resetPwd", "verifyEmail", "home"]
})
