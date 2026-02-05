import type { Request, Response } from 'express';

import { HttpStatusCode } from 'axios';
import { CursorQuerySchema, PaginationQuerySchema, type CursorPaginatedResponse } from '../schemas/pagination.schema';
import { CACHE_KEYS } from '../utils/constants';

import type { IStoreAggregation } from '../schemas/store.schema';

import StoreRepository from '../repositories/store.repository';
import cacheService from '../services/cache.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

class StoreController {
   static async getOneStore(req: Request, res: Response) {
      const storeId = Number(req.params.id);
      const store = await StoreRepository.getOneStoreById(storeId);

      if (!store) {
         return res.status(HttpStatusCode.NotFound).json({ message: 'The store with the given ID does not exist.' });
      }

      res.json({
         success: true,
         message: 'Retrieved store successfully!',
         data: store,
      });
   }

   static async getStores(req: Request, res: Response) {
      const paginationQuery = PaginationQuerySchema.parse(req.query);
      const response = await StoreRepository.getAllStores(paginationQuery);

      res.json({
         success: true,
         message: 'Retrieved stores successfully!',
         data: response,
      });
   }

   static async getInventoryByStore(req: Request, res: Response) {
      const query = CursorQuerySchema.parse(req.query);
      const cacheKey = CACHE_KEYS.getStoreInventoryKey(query);

      let response = await cacheService.retrieve<CursorPaginatedResponse<IStoreAggregation>>(cacheKey);

      if (response) {
         return res.json({
            success: true,
            message: 'Retrieved aggregated stores successfully!',
            data: response,
         });
      }

      response = await StoreRepository.getInventoryByStore(query);

      await cacheService.store(cacheKey, response, 60);

      res.json({
         success: true,
         message: 'Retrieved aggregated stores successfully!',
         data: response,
      });
   }

   static async createStore(req: Request, res: Response) {
      const store = await StoreRepository.createOneStore(req.body);

      res.status(HttpStatusCode.Created).json({
         success: true,
         message: 'Store created successfully!',
         data: store,
      });
   }

   static async updateStore(req: Request, res: Response) {
      const storeId = Number(req.params.id);
      const store = await StoreRepository.updateOneStore(storeId, req.body);

      if (!store) {
         return res.status(HttpStatusCode.NotFound).json({ message: 'The store with the given ID does not exist.' });
      }

      res.json({
         success: true,
         message: 'Store updated successfully!',
         data: store,
      });
   }

   static async deleteStore(req: Request, res: Response) {
      try {
         const storeId = Number(req.params.id);
         const store = await StoreRepository.deleteOneStoreById(storeId);

         if (!store) {
            return res.status(HttpStatusCode.NotFound).json({ message: 'The store with the given ID does not exist.' });
         }

         res.status(HttpStatusCode.Ok).json({
            success: true,
            message: 'Store deleted successfully!',
         });
      } catch (error) {
         if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
               return res.status(HttpStatusCode.Conflict).json({
                  success: false,
                  message:
                     'Cannot delete this store because it has associated products. Please remove or reassign the products first.',
               });
            }
         }

         res.status(HttpStatusCode.InternalServerError).json({
            success: false,
            message: error instanceof Error ? error.message : 'An error occurred while deleting the store.',
         });
      }
   }
}

export default StoreController;
