import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 3,
    keyGenerator: (req) => {
        return req.body.email || req.ip;
    },
});

export const assistantLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 2,
    keyGenerator: (req: any) => {
        const key = req.user?._id?.toString() || req.ip;
        return key;
    },
});
