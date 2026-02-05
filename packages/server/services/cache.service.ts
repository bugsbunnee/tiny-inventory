import logger from '../services/logger.service';
import IORedis from 'ioredis';

const client = new IORedis(Bun.env.REDIS_URL!, {
   maxRetriesPerRequest: null,
   retryStrategy: (times) => Math.min(times * 50, 2000),
});

client.on('connect', () => {
   logger.info('Redis instance connected...');
});

client.on('error', (err) => {
   logger.error('Redis instance error', err);
});

export const cacheService = {
   async store<T>(key: string, value: T, expiryInSeconds: number) {
      try {
         await client.setex(key, expiryInSeconds, JSON.stringify(value));
      } catch (error) {
         logger.error(`Failed to store record in cache for key: ${key}`, error);
      }
   },

   async retrieve<T>(key: string): Promise<T | null> {
      try {
         const data = await client.get(key);
         return data ? JSON.parse(data) : null;
      } catch (error) {
         logger.error('Failed to retrieve record from cache', error);
         return null;
      }
   },

   async remove<T>(key: string): Promise<void> {
      try {
         await client.del(key);
      } catch (error) {
         logger.error('Failed to remove record from cache', error);
      }
   },
};

export default cacheService;
