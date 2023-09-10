import { Template } from "meteor/templating"

import "./ceilNumber.html"

Template.ceilNumber.helpers({
    formattedNumber() {
        const number = Template.instance().data
        return Math.round(number)
    }
})
