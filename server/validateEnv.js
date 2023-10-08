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
if (process.env.ENABLE_DISCORD_WEBHOOKS == null) {
    process.env.ENABLE_DISCORD_WEBHOOKS = Meteor.settings?.private?.ENABLE_DISCORD_WEBHOOKS ?? false
}
if (process.env.ENABLE_DISCORD_GLOBAL_BUFF_WEBHOOKS == null) {
    process.env.ENABLE_DISCORD_GLOBAL_BUFF_WEBHOOKS =
        Meteor.settings?.private?.ENABLE_DISCORD_GLOBAL_BUFF_WEBHOOKS ?? false
}
if (process.env.DISCORD_GLOBAL_BUFF_WEBHOOK_ID == null) {
    process.env.DISCORD_GLOBAL_BUFF_WEBHOOK_ID = Meteor.settings?.private?.DISCORD_GLOBAL_BUFF_WEBHOOK_ID ?? ""
}
if (process.env.DISCORD_GLOBAL_BUFF_ROLE_ID == null) {
    process.env.DISCORD_GLOBAL_BUFF_ROLE_ID = Meteor.settings?.private?.DISCORD_GLOBAL_BUFF_ROLE_ID ?? ""
}
if (process.env.DISCORD_GLOBAL_BUFF_WEBHOOK_TOKEN == null) {
    process.env.DISCORD_GLOBAL_BUFF_WEBHOOK_TOKEN = Meteor.settings?.private?.DISCORD_GLOBAL_BUFF_WEBHOOK_TOKEN ?? ""
}

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: "development" }),
    METEOR_STAGING: bool({ default: false }),
    METEOR_BASIC_AUTH_USER: str({ default: "abcd" }),
    METEOR_BASIC_AUTH_PASS: str({ default: "efgh" }),
    METRIC_BASIC_AUTH_USER: str({ default: "abcd" }),
    METRIC_BASIC_AUTH_PASS: str({ default: "efgh" }),
    MAX_FLOOR: num({ default: 25 }),
    ENABLE_DISCORD_WEBHOOKS: bool({ default: false }),
    ENABLE_DISCORD_GLOBAL_BUFF_WEBHOOKS: bool({ default: false }),
    DISCORD_GLOBAL_BUFF_ROLE_ID: str({ default: "" }),
    DISCORD_GLOBAL_BUFF_WEBHOOK_ID: str({ default: "" }),
    DISCORD_GLOBAL_BUFF_WEBHOOK_TOKEN: str({ default: "" })
})

export const validateEnv = () => env
