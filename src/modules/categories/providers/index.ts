import { CategoriesRepository } from '@categories/repositories/categories.repository';

export const categoryProviders = [
  {
    provide: 'CategoriesRepository',
    useClass: CategoriesRepository,
  },
];
