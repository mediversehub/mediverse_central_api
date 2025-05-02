const rateLimiterConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    'Huh? Too many requests. Please try again later for security purposes iykyk.',
  standardHeaders: true, // This will return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // This is basically used for disabling the `X-RateLimit-*` headers
};

export default rateLimiterConfig;
