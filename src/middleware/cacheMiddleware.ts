import { Request, Response, NextFunction } from 'express';
import redisClient from '../lib/redisClient';

const CACHE_TIMEOUT = 3600; // 1 hour cache 

export default async function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
    const key = "express_cache_" + req.method + "_" + req.originalUrl || req.url;

    try {
        const cachedData = await redisClient.get(key);
        if (cachedData != null) {
            return res.send(JSON.parse(cachedData));
        }

        const originalSend = res.send.bind(res);

        (res as any).send = (body: any) => {
            try {
                redisClient.setEx(key, CACHE_TIMEOUT, JSON.stringify(body));
            } catch (err) {
                console.error('Error caching data', err);
            }
            originalSend(body);
        };

        next();
    } catch (err) {
        console.error('Redis error', err);
        next(err);
    }
};
