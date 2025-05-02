import cluster from 'cluster';
import os from 'os';

import logger from './src/utils/logger';

const enableClustering = process.env.ENABLE_CLUSTERING === 'true';

if (enableClustering && cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  logger.info(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    logger.info(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  import('./src/index');
}
