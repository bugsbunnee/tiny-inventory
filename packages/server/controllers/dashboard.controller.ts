import type { Request, Response } from 'express';
import type { DashboardMetrics } from '../repositories/dashboard.repository';

import { CACHE_KEYS } from '../utils/constants';

import DashboardRepository from '../repositories/dashboard.repository';
import cacheService from '../services/cache.service';

class DashboardController {
   static async getDashboardMetrics(req: Request, res: Response) {
      const cacheKey = CACHE_KEYS.getDashboardMetricsKey();
      const response = cacheService.retrieve<DashboardMetrics>(cacheKey);

      if (response) {
         return res.json({
            success: true,
            message: 'Retrieved dashboard metrics successfully!',
            data: response,
         });
      }

      const metrics = await DashboardRepository.getDashboardMetrics();
      cacheService.store(cacheKey, response, 300);

      return res.json({
         success: true,
         message: 'Retrieved dashboard metrics successfully!',
         data: metrics,
      });
   }
}

export default DashboardController;
