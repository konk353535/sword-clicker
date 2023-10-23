import { WebhookClient } from "discord.js"
import { env } from "/server/validateEnv"

export const globalBuffWebhookClient = new WebhookClient(env.DISCORD_GLOBAL_BUFF_WEBHOOK_ID, env.DISCORD_GLOBAL_BUFF_WEBHOOK_TOKEN)

export const sendGlobalBuffWebhookMessage = (content, ping = true) => {
    if (ping) {
        // add to start of message
        content = `<@&${env.DISCORD_GLOBAL_BUFF_ROLE_ID}>: ${content}`
    }
    if (env.ENABLE_DISCORD_WEBHOOKS && env.ENABLE_DISCORD_GLOBAL_BUFF_WEBHOOKS) {
        globalBuffWebhookClient.send(content).catch(console.error)
    }
}

export const fireBrigadeWebhookClient = new WebhookClient(env.DISCORD_FIRE_BRIGADE_WEBHOOK_ID, env.DISCORD_FIRE_BRIGADE_WEBHOOK_TOKEN)

export const sendFireBrigadeWebhookMessage = (content, codeblock = false, ping = true) => {
    if (codeblock) {
        content = `\`\`\`javascript\n${content}\`\`\``
    }
    if (ping) {
        // add to start of message
        content = `<@&${env.DISCORD_DEV_ROLE_ID}>: ${content}`
    }
    if (env.ENABLE_DISCORD_WEBHOOKS && env.ENABLE_DISCORD_FIRE_BRIGADE_WEBHOOKS) {
        fireBrigadeWebhookClient.send(content).catch(console.error)
    }
}

/* Constructs a message like:
@dev:
<Message content goes here>
```javascript
<Block content goes here>
```
*/
export const sendFireBrigadeWebhookMessageBlock = (message, block, codeblock = true, ping = true) => {
    let content = `${message}:\n\`\`\`javascript\n${block}\`\`\``
    if (ping) {
        // add to start of message
        content = `<@&${env.DISCORD_DEV_ROLE_ID}>:\n${content}`
    }
    if (env.ENABLE_DISCORD_WEBHOOKS && env.ENABLE_DISCORD_FIRE_BRIGADE_WEBHOOKS) {
        fireBrigadeWebhookClient.send(content).catch(console.error)
    }
}