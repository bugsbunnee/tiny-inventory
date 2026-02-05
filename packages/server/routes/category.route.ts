import express from 'express';

import { PaginationQuerySchema } from '../schemas/pagination.schema';

import validateId from '../middleware/validateId';
import validatePayload from '../middleware/validatePayload';

import CategoryController from '../controllers/category.controller';

const router = express.Router();

router.get('/:id', [validateId], CategoryController.getOneCategory);
router.get('/', [validatePayload(PaginationQuerySchema, 'query')], CategoryController.getCategories);

export default router;
