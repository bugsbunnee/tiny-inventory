import { prisma } from '../prisma';
import type { Category } from '../prisma/generated/prisma/client';

class SeedService {
   static async seed() {
      await prisma.product.deleteMany();
      await prisma.store.deleteMany();
      await prisma.category.deleteMany();

      const SEED_CATEGORIES: Category[] = [
         {
            id: 1,
            name: 'Furniture',
         },
         {
            id: 2,
            name: 'Electronics',
         },
         {
            id: 3,
            name: 'Home & Garden',
         },
         {
            id: 4,
            name: 'Modern Desk Lamp',
         },
         {
            id: 5,
            name: 'Lighting',
         },
         {
            id: 6,
            name: 'Accessories',
         },
      ];

      const SEED_STORES = [
         { id: 1, name: 'Downtown Boutique', location: '123 Main St, Seattle' },
         { id: 2, name: 'Uptown Tech', location: '456 Elm Ave, Austin' },
         { id: 3, name: 'Lakeside Home', location: '789 Shore Dr, Chicago' },
      ];

      const SEED_PRODUCTS = [
         {
            store_id: 3,
            name: 'Minimalist Chair',
            category_id: 1,
            price: 129.99,
            quantity_in_stock: 15,
            description: 'Ergonomic design with natural wood finish.',
            image_url:
               'https://images.unsplash.com/photo-1715618368833-752c6b65f51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2hhaXJ8ZW58MXx8fHwxNzcwMjQzODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
         },
         {
            store_id: 2,
            name: 'Noise Cancelling Headphones',
            category_id: 2,
            price: 249.5,
            quantity_in_stock: 8,
            description: 'Immersive sound with active noise cancellation.',
            image_url:
               'https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc3MDEyNDA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
         },
         {
            store_id: 3,
            name: 'Ceramic Plant Pot',
            category_id: 3,
            price: 35.0,
            quantity_in_stock: 42,
            description: 'Handcrafted ceramic pot, perfect for indoor plants.',
            image_url:
               'https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcGxhbnQlMjBwb3R8ZW58MXx8fHwxNzcwMjQzODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
         },
         {
            store_id: 3,
            name: 'Modern Desk Lamp',
            category_id: 5,
            price: 89.99,
            quantity_in_stock: 20,
            description: 'Adjustable LED lamp with sleek metal finish.',
            image_url:
               'https://images.unsplash.com/photo-1621447980929-6638614633c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcHxlbnwxfHx8fDE3NzAyMDQ2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
         },
         {
            store_id: 1,
            name: 'Insulated Water Bottle',
            category_id: 6,
            price: 24.99,
            quantity_in_stock: 120,
            description: 'Keeps drinks cold for 24 hours, hot for 12.',
            image_url:
               'https://images.unsplash.com/photo-1683383795554-c23ae70adfc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXRlciUyMGJvdHRsZXxlbnwxfHx8fDE3NzAxODM2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
         },
         {
            store_id: 1,
            name: 'Everyday Backpack',
            category_id: 6,
            price: 75.0,
            quantity_in_stock: 5,
            description: 'Durable and water-resistant with laptop compartment.',
            image_url:
               'https://images.unsplash.com/photo-1579718091289-38794781a3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmFja3BhY2t8ZW58MXx8fHwxNzcwMTY0NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
         },
      ];

      await prisma.category.createMany({ data: SEED_CATEGORIES });
      await prisma.store.createMany({ data: SEED_STORES });
      await prisma.product.createMany({ data: SEED_PRODUCTS });
   }
}

export default SeedService;
