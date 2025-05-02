import cors from 'cors';
import corsConfig from '../configs/cors.config';

const corsMiddleware = cors(corsConfig);

export default corsMiddleware;
