import express from 'express';

import validateId from '../middleware/validateId';
import validatePayload from '../middleware/validatePayload';

import { StoreSchema } from '../schemas/store.schema';
import { CursorQuerySchema, PaginationQuerySchema } from '../schemas/pagination.schema';

import StoreController from '../controllers/store.controller';

const router = express.Router();

router.get('/inventories', [validatePayload(CursorQuerySchema, 'query')], StoreController.getInventoryByStore);
router.get('/:id', [validateId], StoreController.getOneStore);
router.put('/:id', [validateId, validatePayload(StoreSchema, 'body')], StoreController.updateStore);
router.delete('/:id', [validateId], StoreController.deleteStore);

router.get('/', [validatePayload(PaginationQuerySchema, 'query')], StoreController.getStores);
router.post('/', [validatePayload(StoreSchema, 'body')], StoreController.createStore);

export default router;
