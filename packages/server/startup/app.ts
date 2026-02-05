import dotenv from 'dotenv';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import categories from '../routes/category.route';
import dashboard from '../routes/dashboard.route';
import products from '../routes/product.route';
import stores from '../routes/store.route';

import error from '../middleware/error';

dotenv.config();

function setupApp() {
   const app = express();

   app.use(cors());
   app.use(helmet());
   app.use(express.json());

   app.use('/api/categories', categories);
   app.use('/api/dashboard', dashboard);
   app.use('/api/products', products);
   app.use('/api/stores', stores);

   app.use(error);

   return app;
}

export default setupApp;
