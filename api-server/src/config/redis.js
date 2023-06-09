import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
const redisUsername = process.env.REDIS_USERNAME || "";
const redisPassword = process.env.REDIS_PASSWORD || "";
const redisHost = process.env.REDIS_HOST || "";
const redisPort = process.env.REDIS_PORT || "";
const redisChannel = process.env.REDIS_CHANNEL || "";

const redisUrl = `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}`;

export const redisClient = createClient({ url: redisUrl });


