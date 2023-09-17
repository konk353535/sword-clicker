import "dotenv/config"
import { EnvError, cleanEnv, makeValidator, port, str } from "envalid"
import { z } from "zod"

const serverSchema = z.string().array()

const servers = makeValidator<z.infer<typeof serverSchema>>((input: string) => {
    const serverList = serverSchema.safeParse(input.split(","))

    if (serverList.success) {
        return serverList.data
    } else {
        throw new EnvError(`Invalid server input: "${input}", err: ${serverList.error}`)
    }
})

// default value since custom validator doesn't accept a default argument
if (process.env.SERVERS == null) {
    process.env.SERVERS = "http://localhost:3055"
}

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: "development" }),
    HTTP_PORT: port({ default: 3057 }),
    HTTPS_PORT: port({ default: 443 }),
    SERVERS: servers(),
    METRIC_BASIC_AUTH_USER: str({ default: "abcd" }),
    METRIC_BASIC_AUTH_PASS: str({ default: "efgh" })
})

export const validateEnv = () => env
