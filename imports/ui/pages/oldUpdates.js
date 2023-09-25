import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import "./oldUpdates.html"

Template.oldUpdatesPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})
