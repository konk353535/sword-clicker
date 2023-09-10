import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import "./faq.html"

Template.faqPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})
