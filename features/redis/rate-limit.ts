import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./client";

export const repoSyncRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "10 s"),
});
