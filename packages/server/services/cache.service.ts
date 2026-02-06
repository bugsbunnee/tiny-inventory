import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const cacheService = {
   store<T>(key: string, value: T, expiryInSeconds: number) {
      return cache.set(key, JSON.stringify(value), expiryInSeconds);
   },

   retrieve<T>(key: string): T | null {
      const value = cache.get<string>(key);
      return value ? JSON.parse(value) : null;
   },

   remove(key: string): boolean {
      return cache.del(key) > 0;
   },
};

export default cacheService;
