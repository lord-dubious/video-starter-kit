import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

export type RateLimiter = {
  perMinute: Ratelimit;
  perHour: Ratelimit;
  perDay: Ratelimit;
};

export const createRateLimiter = (tokens: number, window: string) =>
  new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(tokens, window as any),
    analytics: true,
  });

type LimitPeriod = "perMinute" | "perHour" | "perDay";

export const RATE_LIMIT_PERIOD_LABELS: Record<LimitPeriod, string> = {
  perMinute: "minute",
  perHour: "hour",
  perDay: "day",
};

type LimitResult =
  | {
      shouldLimitRequest: false;
    }
  | { shouldLimitRequest: true; period: LimitPeriod };

export const IS_RATE_LIMITER_ENABLED =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

export async function shouldLimitRequest(
  limiter: RateLimiter,
  ip: string,
): Promise<LimitResult> {
  if (!IS_RATE_LIMITER_ENABLED) {
    return { shouldLimitRequest: false };
  }
  const limits = ["perMinute", "perHour", "perDay"] as const;
  const results = await Promise.all(
    limits.map((limit) => limiter[limit].limit(ip)),
  );
  const limitRequestIndex = results.findIndex((result) => !result.success);
  return {
    shouldLimitRequest: limitRequestIndex >= 0,
    period: limits[limitRequestIndex],
  };
}
