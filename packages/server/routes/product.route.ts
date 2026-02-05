import express from 'express';

import validateId from '../middleware/validateId';
import validatePayload from '../middleware/validatePayload';

import ProductController from '../controllers/product.controller';

import { ProductQuerySchema, ProductSchema } from '../schemas/product.schema';

const router = express.Router();

router.get('/:id', [validateId], ProductController.getOneProduct);
router.put('/:id', [validateId, validatePayload(ProductSchema, 'body')], ProductController.updateProduct);
router.delete('/:id', [validateId], ProductController.deleteProduct);

router.get('/', [validatePayload(ProductQuerySchema, 'query')], ProductController.getProducts);
router.post('/', [validatePayload(ProductSchema, 'body')], ProductController.createProduct);

export default router;
