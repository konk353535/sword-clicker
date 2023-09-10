import { Meteor } from "meteor/meteor"

import { State } from "/imports/api/state/state"

Meteor.publish("state", function () {
    return State.find()
})
