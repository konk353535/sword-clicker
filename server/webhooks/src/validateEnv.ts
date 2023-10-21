import "dotenv/config"
import { cleanEnv, port, str } from "envalid"

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: "development" }),
    HTTP_PORT: port({ default: 8443 }),
    STRIPE_SECRET_KEY: str(),
    STRIPE_WEBHOOK_SECRET: str(),
    GEM_BUNCH: str(),
    GEM_BAG: str(),
    GEM_BOX: str(),
    MONGO_URI: str(),
    MONGO_DB: str()
})

export const validateEnv = () => env
