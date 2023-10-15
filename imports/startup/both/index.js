import { Meteor } from "meteor/meteor"

import "./useraccounts-configuration.js"

// Deny all client-side updates to user documents
Meteor.users.deny({
    update() {
        return true
    }
})
