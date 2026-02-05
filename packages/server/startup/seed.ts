import SeedService from '../services/seed.service';

import * as constants from '../utils/constants';

async function setupSeeds() {
   if (constants.FEATURES.SEED_ON_STARTUP) {
      await SeedService.seed();
   }
}

export default setupSeeds;
