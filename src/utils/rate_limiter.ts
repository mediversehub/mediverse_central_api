import rateLimit from 'express-rate-limit';
import rateLimiterConfig from '../configs/rate_limiter.config';

const rateLimiter = rateLimit(rateLimiterConfig);

export default rateLimiter;
