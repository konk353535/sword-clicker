import { bool, cleanEnv, num, str } from "envalid"
import { Meteor } from "meteor/meteor"

if (process.env.METEOR_STAGING == null) {
    process.env.METEOR_STAGING = Meteor.settings?.private?.METEOR_STAGING ?? false
}
if (process.env.METEOR_BASIC_AUTH_USER == null) {
    process.env.METEOR_BASIC_AUTH_USER = Meteor.settings?.private?.METEOR_BASIC_AUTH_USER ?? "abcd"
}
if (process.env.METEOR_BASIC_AUTH_PASS == null) {
    process.env.METEOR_BASIC_AUTH_PASS = Meteor.settings?.private?.METEOR_BASIC_AUTH_PASS ?? "efgh"
}
if (process.env.METRIC_BASIC_AUTH_USER == null) {
    process.env.METRIC_BASIC_AUTH_USER = Meteor.settings?.private?.METRIC_BASIC_AUTH_USER ?? "abcd"
}
if (process.env.METRIC_BASIC_AUTH_PASS == null) {
    process.env.METRIC_BASIC_AUTH_PASS = Meteor.settings?.private?.METRIC_BASIC_AUTH_PASS ?? "efgh"
}
if (process.env.MAX_FLOOR == null) {
    process.env.MAX_FLOOR = Meteor.settings?.shared?.maxFloor ?? 25
}

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: "development" }),
    METEOR_STAGING: bool({ default: false }),
    METEOR_BASIC_AUTH_USER: str({ default: "abcd" }),
    METEOR_BASIC_AUTH_PASS: str({ default: "efgh" }),
    METRIC_BASIC_AUTH_USER: str({ default: "abcd" }),
    METRIC_BASIC_AUTH_PASS: str({ default: "efgh" }),
    MAX_FLOOR: num({ default: 25 })
})

export const validateEnv = () => env
