import "dotenv/config"
import { bool, cleanEnv, port, str } from "envalid"

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: "development" }),
    HTTP_PORT: port({ default: 3055 }),
    SERVER_URL: str({ default: "http://localhost:3000" }),
    METEOR_STAGING: bool({ default: false }),
    METEOR_BASIC_AUTH_USER: str({ default: "abcd" }),
    METEOR_BASIC_AUTH_PASS: str({ default: "efgh" }),
    METRIC_BASIC_AUTH_USER: str({ default: "abcd" }),
    METRIC_BASIC_AUTH_PASS: str({ default: "efgh" })
})

export const validateEnv = () => env
