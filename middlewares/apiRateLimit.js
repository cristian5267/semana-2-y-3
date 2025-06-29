import { cacheValkey } from "../config/cacheValkey.js";

export const apiRateLimit = async (req, res, next) => {
    let ip;
    // 2 request cada 3 segundos
    const limit = 100;
    const seconds = 60;

    if (req.headers["x-forwarded-for"]) {
        ip = req.headers["x-forwarded-for"];
    } else {
        ip = req.connection.remoteAddress;
    }

    await cacheValkey.incr(ip);
    await cacheValkey.expire(ip, seconds);

    const value = await cacheValkey.get(ip);

    if (+value >= limit) {
        return res.status(429).json({
            error: "Too Many Requests",
        });
    }

    next();
};
