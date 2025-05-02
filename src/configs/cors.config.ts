import { CorsOptions } from 'cors';

const allowedOrigins = [process.env.MEDIVERSE_CENTRAL_APP_FRONTEND_URL];

const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,

  methods: ['GET', 'POST', 'PUT'],

  allowedHeaders: ['Content-Type', 'Authorization'],

  exposedHeaders: ['Authorization'],
};

export default corsConfig;
