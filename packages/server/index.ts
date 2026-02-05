import logger from './services/logger.service';
import setupApp from './startup/app';
import setupSeeds from './startup/seed';

const app = setupApp();
const port = Bun.env.PORT || 3088;

setupSeeds();

app.listen(port, () => logger.info(`Listening on port...`));
