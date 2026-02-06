import setupApp from './startup/app';
import startServer from './startup/server';

const app = setupApp();
startServer(app);

export default app;
