import { createClient } from "redis";
import config from '../config/configs';

const redisClient = createClient({
    url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`
});

redisClient.on('error', (err: Error) => {
    console.error('Redis Client Error', err);
});

redisClient.connect().catch((err: Error) => {
    console.error('Redis connection error', err);
});

export default redisClient;
