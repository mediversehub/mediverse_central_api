import helmet from 'helmet';
import helmetConfig from '../configs/helmet.config';

const helmetMiddleware = helmet(helmetConfig);
export default helmetMiddleware;
