import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import Numeral from "numeral"

import { ReactiveDict } from "meteor/reactive-dict"
import { Users } from "/imports/api/users/users.js"

import { CDbl, CInt, False, IsValid, True, autoPrecisionValue } from "/imports/utils"

import "./formatNumber.html"

Template.formatNumber.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        if (myUser) {
            if (myUser.uiState && myUser.uiState.showNumberShorthand !== undefined) {
                this.state.set("showNumberShorthand", myUser.uiState.showNumberShorthand)
            } else {
                this.state.set("showNumberShorthand", true)
            }
        }
    })
})

const trimTrailingDecimal = function(val) {
    if (val && typeof val === "string") {
        const lastChar = val.substring(val.length - 1)
        if (lastChar >= '0' && lastChar <= '9') {
            return val.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0*$)/,'$1')
        }

        // this assumes that the notation only has one letter to symbolize shorthand length

        return val.substring(0, val.length - 1).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0*$)/,'$1') + lastChar
    }

    return val
}

Template.formatNumber.helpers({
    formattedNumber() {
        const instance = Template.instance()
        const templateData = instance.data

        let number = CDbl(templateData.number) // 0.0 by default

        const options = {}

        options.specifiedDecimalPrecision = IsValid(templateData.decimal) && typeof templateData.decimal === "number" // false by default (unless '.decimal' is explicitly set to a number)
        options.forcedNoDecimal = False(templateData.noDecimal) // false by default (unless '.noDecimal' is explicitly set)
        options.wantShorthand = False(instance.state.get("showNumberShorthand")) || False(templateData.forceShorthand) // false by default (for both values, thus this whole value, unless 'forceShorthand' is explicitly set or user's state 'showNumberShorthand' option is enabled)
        options.wantBlankZero = False(templateData.blankZero) // false by default (unless '.blankZero' is explicitly set)

        options.decimalPrecision = options.specifiedDecimalPrecision ? CInt(templateData.decimal) : 1 // 1 by default
        options.haveDecimalPrecision = !options.forcedNoDecimal && options.decimalPrecision > 0 // true by default (unless '.decimal' or '.noDecimal' is explicitly set)
        options.wantForcedDecimal = options.haveDecimalPrecision && options.specifiedDecimalPrecision // false by default (unless '.decimal', '.noDecimal', or '.decimal' is explicitly set)
        options.wantAutoPrecision = True(templateData.autoPrecision) // true by default

        options.wantTrimDecimal = False(templateData.trimDecimal)

        //console.log('Formatting number', number);

        if (!options.haveDecimalPrecision) {
            number = Math.floor(number)
        } else if (options.wantAutoPrecision) {
            number = autoPrecisionValue(number)
        }

        options.showDecimal =
            options.wantForcedDecimal || (options.haveDecimalPrecision && Math.floor(number) != number)

        //console.log(options);
        //console.log('Formatted number', number);

        // Stop here and return a blank value if the number is 0 and '.blankZero' was explicitly set
        if (options.wantBlankZero && number == 0) {
            return ""
        }

        // NOTE: for numbers < 1,000, if we're forcing precision to a specific decimal place, use a simple number formatter

        if (options.wantForcedDecimal && number < 1000) {
            if (options.wantTrimDecimal) {
                return trimTrailingDecimal(number.toFixed(options.decimalPrecision))
            }
            return number.toFixed(options.decimalPrecision)
        }

        // NOTE: for numbers >= 1,000, 'specifiedDecimalPrecision' is ignored and all decimal precision will be displayed which
        //       means wantAutoPrecision should be on by default to cap this for large numbers (although this is NOT enforced).

        // If we want shorthand numbers...
        if (options.wantShorthand) {
            // ... and are forcing decimal precision -- and -- the number >= 1,000 (required so 1,200 will appear as 1.2k in shorthand, etc.)
            if (options.wantForcedDecimal && number >= 1000) {
                // ...... display  as shorthand (including any decimals in the number)
                if (options.wantTrimDecimal) {
                    return trimTrailingDecimal(Numeral(number).format("0.0a"))
                }
                return Numeral(number).format("0.0a")
            }

            // ... the number >= 1,000 (required so 1,200 will appear as 1.2k in shorthand, etc.)
            if (number >= 1000) {
                // ...... display as shorthand (including any decimals in the number)
                return trimTrailingDecimal(Numeral(number).format("0.0a"))
            }

            // ... otherwise, display as shorthand (but don't display decimals)
            return trimTrailingDecimal(Numeral(number).format("0a"))
        }

        // If we are forcing decimal precision -- or -- we have not specified to disable decimals and we have decimal precision in the number
        if (options.showDecimal) {
            // ... display as formatted xx,xxx,xxx.yyy (including any decimals in the number)
            return trimTrailingDecimal(Numeral(number).format("0,0.0"))
        }

        // Otherwise, display as formatted xx,xxx,xxx (but don't display decimals)
        return trimTrailingDecimal(Numeral(number).format("0,0"))
    }
})
