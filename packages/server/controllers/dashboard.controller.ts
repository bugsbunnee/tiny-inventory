import type { Request, Response } from 'express';
import DashboardRepository from '../repositories/dashboard.repository';

class DashboardController {
   static async getDashboardMetrics(req: Request, res: Response) {
      const metrics = await DashboardRepository.getDashboardMetrics();

      return res.json({
         success: true,
         message: 'Retrieved dashboard metrics successfully!',
         data: metrics,
      });
   }
}

export default DashboardController;
