import rateLimit from 'express-rate-limit';

const rateLimiterConfig = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    'Huh? Too many requests,Please try again later for security purposes iykyk.',
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiterConfig;
