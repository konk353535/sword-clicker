import { WebhookClient } from "discord.js"
import { env } from "/server/validateEnv"

export const globalBuffWebhookClient = new WebhookClient(
    env.DISCORD_GLOBAL_BUFF_WEBHOOK_ID,
    env.DISCORD_GLOBAL_BUFF_WEBHOOK_TOKEN
)

export const sendGlobalBuffWebhookMessage = (content, ping = true) => {
    if (ping) {
        // add to start of message
        content = `<@&${env.DISCORD_GLOBAL_BUFF_ROLE_ID}>: ${content}`
    }
    if (env.ENABLE_DISCORD_WEBHOOKS && env.ENABLE_DISCORD_GLOBAL_BUFF_WEBHOOKS) {
        globalBuffWebhookClient.send(content).catch(console.error)
    }
}
