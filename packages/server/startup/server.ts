import type { Express } from 'express';

import logger from '../services/logger.service';
import setupSeeds from './seed';

function startServer(app: Express) {
   const port = Bun.env.PORT || 3088;

   if (Bun.env.NODE_ENV !== 'test') {
      setupSeeds();
      app.listen(port, () => logger.info(`Listening on port...`));
   }

   return port;
}

export default startServer;
